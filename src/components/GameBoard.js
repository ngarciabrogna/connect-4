import React, { useEffect, useState } from "react";

import Header from "./Header";
import Footer from "./Footer";
import GameCircle from "./GameCircle";

import { isDraw, isWinner, getComputerMove } from "../helper";
import {
  GAME_STATE_PLAYING,
  GAME_STATE_WIN,
  NO_PLAYER,
  PLAYER_1,
  PLAYER_2,
  NO_CIRCLES,
  GAME_STATE_DRAW,
  PLAYER_COM,
  GAME_STATE_PLAYING_COM,
} from "../Constants";

const GameBoard = () => {
  const [gameBoard, setGameBoard] = useState(Array(16).fill(NO_PLAYER));
  const [currentPlayer, setCurrentPlayer] = useState(PLAYER_1);
  const [gameState, setGameState] = useState(-1);
  const [winPlayer, setWinPlayer] = useState(NO_PLAYER);
  /*  const [playerCom, setPlayerCom] = useState(PLAYER_COM); */

  console.log(gameBoard);

  useEffect(() => {
    pickVersus();
  }, []);

  const pickVersus = () => {
    if (gameState === -1) {
      console.log("game select");
    }
  };
  const initGame = () => {
    setGameBoard(Array(NO_CIRCLES).fill(NO_PLAYER));
    setCurrentPlayer(PLAYER_1); //lets do something here to random pick who go first
    setGameState(GAME_STATE_PLAYING);
  };

  const onNewGameClickComputer = () => {
    setGameBoard(Array(NO_CIRCLES).fill(NO_PLAYER));
    setCurrentPlayer(PLAYER_1);
    setGameState(GAME_STATE_PLAYING_COM);
    console.log("Player com game " + GAME_STATE_PLAYING_COM);
  };

  const initBoard = () => {
    const circles = [];
    for (let i = 0; i < NO_CIRCLES; i++) {
      circles.push(renderCircle(i));
    }
    return circles;
  };

  const suggestMove = () => {
    if (currentPlayer === PLAYER_1) {
      alert("* * *Human player turn * * *");
    } else {
      circleClicked(getComputerMove(gameBoard));
    }
  };
  function handleChange(event) {
    console.log(event.target.value);
  }

  const circleClicked = (id) => {
    console.log("CP: IF INCIAL " + currentPlayer);
    console.log("FLUJO ELSE NORMAL ");
    if (gameBoard[id] !== NO_PLAYER) return;
    if (
      gameState !== GAME_STATE_PLAYING &&
      gameState !== GAME_STATE_PLAYING_COM
    )
      return;

    if (isWinner(gameBoard, id, currentPlayer)) {
      setGameState(GAME_STATE_WIN);
      setWinPlayer(currentPlayer);
    }

    if (isDraw(gameBoard, id, currentPlayer)) {
      setGameState(GAME_STATE_DRAW);
      setWinPlayer(NO_PLAYER);
    }

    setGameBoard((prev) => {
      return prev.map((circle, pos) => {
        if (pos === id) return currentPlayer;
        return circle;
      });
    });
    setCurrentPlayer(currentPlayer === PLAYER_1 ? PLAYER_2 : PLAYER_1);
  };

  const renderCircle = (id) => {
    return (
      <GameCircle
        key={id}
        id={id}
        className={`player_${gameBoard[id]}`}
        onCircleClicked={circleClicked}
      />
    );
  };
  return (
    <>
      <Header
        gameState={gameState}
        currentPlayer={currentPlayer}
        winPlayer={winPlayer}
      />
      <div className="gameBoard" onChange={handleChange}>
        {initBoard()}
      </div>
      <Footer
        onNewGameCLick={initGame}
        onNewGameClickComputer={onNewGameClickComputer}
        onSuggestClick={suggestMove}
        gameState={gameState}
      />
    </>
  );
};

export default GameBoard;

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

  const pickVersus = () => { //pick game mode
    if (gameState === -1) {
    }
  };
  const initGame = () => { // pvp init
    setGameBoard(Array(NO_CIRCLES).fill(NO_PLAYER));
    setCurrentPlayer(PLAYER_1); //lets do something here to random pick who go first
    setGameState(GAME_STATE_PLAYING);
  };

  const onNewGameClickComputer = () => { //vs com init
	alert("* * * COMPUTER PLAYER WILL NOT AUTO-PLAY, YOU MUST PRESS THE GREEN BUTTON * * *");
    setGameBoard(Array(NO_CIRCLES).fill(NO_PLAYER));
    setCurrentPlayer(PLAYER_1);
    setGameState(GAME_STATE_PLAYING_COM);
  };

  const initBoard = () => { //board init
    const circles = [];
    for (let i = 0; i < NO_CIRCLES; i++) {
      circles.push(renderCircle(i));
    }
    return circles;
  };

  const suggestMove = () => { // automove
    if (currentPlayer === PLAYER_1) {
      alert("* * *HUMAN PLAYER TURN * * *");
    } else {
      circleClicked(getComputerMove(gameBoard));
    }
  };
  function handleChange(event) {
    console.log(event.target.value);
  }

  const circleClicked = (id) => {
    if (gameState === -1) {
      alert("* * * SELECT GAME MODE * * *");
    }
    var circles = document.getElementsByClassName("gameCircle");
    if (gameState === GAME_STATE_PLAYING_COM && currentPlayer === PLAYER_1) {
      for (var i = 0; i < circles.length; i++) {
        circles[i].style.pointerEvents = "none";
      }
    }
    if (gameState === GAME_STATE_PLAYING_COM && currentPlayer === PLAYER_2) {
      for (var i = 0; i < circles.length; i++) {
        circles[i].style.pointerEvents = "auto";
      }
    }

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

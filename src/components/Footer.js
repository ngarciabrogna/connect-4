import React from "react";
import { GAME_STATE_PLAYING, GAME_STATE_PLAYING_COM } from "../Constants";

export const Footer = ({
  onNewGameCLick,
  onSuggestClick,
  gameState,
  onNewGameClickComputer,
}) => {
  const renderButtons = () => {
    if (gameState === GAME_STATE_PLAYING_COM) {
      return (
        <button id="comButton" onClick={onSuggestClick}>
          COM PLAY
        </button>
      );
    } else if (gameState === GAME_STATE_PLAYING) {
      return <span className="playing center">Game is running!</span>;
    } else {
      return (
        <>
          <button className="button-2" onClick={onNewGameCLick}>
            {" "}
            Player Vs Player
          </button>
          <button className="button-2" onClick={onNewGameClickComputer}>
            {" "}
            Player Vs COM
          </button>
        </>
      );
    }
  };

  return <div className="panel footer">{renderButtons()}</div>;
};

export default Footer;

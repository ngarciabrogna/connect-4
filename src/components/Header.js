import React from "react";

import {
  GAME_STATE_DRAW,
  GAME_STATE_PLAYING,
  GAME_STATE_PLAYING_COM,
  GAME_STATE_WIN,
} from "../Constants";

export const Header = ({ gameState, currentPlayer, winPlayer }) => {
  const renderLabel = () => {
    switch (gameState) {
      case GAME_STATE_PLAYING:
        return <div className="center"> Player {currentPlayer} Turn </div>;
      case GAME_STATE_PLAYING_COM:
        return <div className="center"> Player {currentPlayer} Turn </div>;
      case GAME_STATE_WIN:
        return <div className="center win"> Player {winPlayer} Wins</div>;
      case GAME_STATE_DRAW:
        return <div className="center"> Game is a draw!</div>;
      default:
        return <div className="center">Lets play!</div>;
    }
  };
  return (
    <div className="panel header">
      <div className="header-text">{renderLabel()}</div>
    </div>
  );
};

export default Header;

import React, { useReducer } from "react";
import { useLocation } from "react-router-dom";
import { PlayStateProvider } from "./../contexts/playStateContext.js";

import Header from "./../components/Header.jsx";
import PlayController from "../components/PlayController.jsx";

import gameboard_img from "./../assets/game_board.jpg";
import red_doe from "./../assets/red-doe-icon.png";
import green_doe from "./../assets/green-doe-icon.png";

import "./../styles/playground.css";
import playControllerReducer from "../reducers/playControllerReducer.js";

const PlayGround = () => {
  const location = useLocation();
  const mode = location.state.mode;
  const initialValues = {
    mode: mode,
    turn: 1,
    player1_position: 0,
    player2_position: 0,
  };

  const [state, dispatch] = useReducer(playControllerReducer, initialValues);

  const coordinations = (position) => {
    if (position < 0 && position > 100) {
      return null;
    }
    switch (true) {
      case position < 11:
        return [1, position];
      case position < 21:
        return [2, position - (position - 10 + (position - 11))];
      case position < 31:
        return [3, position - 20];
      case position < 41:
        return [4, position - (position - 10 + (position - 31))];
      case position < 51:
        return [5, position - 40];
      case position < 61:
        return [6, position - (position - 10 + (position - 51))];
      case position < 71:
        return [7, position - 60];
      case position < 81:
        return [8, position - (position - 10 + (position - 71))];
      case position < 91:
        return [9, position - 80];
      case position < 101:
        return [10, position - (position - 10 + (position - 91))];
      default:
        return null;
    }
  };

  const getPosition = (position) => {
    const coords = coordinations(position);

    if (!coords) {
      return null;
    }
    const [row, column] = coords;

    const y = row * 25 + 25 * (row - 1);
    const x = column * 25 + 25 * (column - 1);
    return { x, y };
  };

  const setStyleRed = (position) => {
    if (position === 0) {
      return {
        display: "none",
      };
    }
    const { x, y } = getPosition(position);
    return {
      left: `${x}px`,
      bottom: `${y}px`,
    };
  };

  const setStyleGreen = (position) => {
    if (position === 0) {
      return { display: "none" };
    }
    const { x, y } = getPosition(position);
    return {
      left: `${x}px`,
      bottom: `${y}px`,
    };
  };

  return (
    <PlayStateProvider value={{ state, dispatch }}>
      <div className="playground_page page">
        <div className="wrapper">
          <Header />
          <div className="gameboard">
            <img src={gameboard_img} alt="board" />
            <img
              src={red_doe}
              alt="red_doe"
              className="red_doe doe"
              style={setStyleRed(state.player1_position)}
            />
            <img
              src={green_doe}
              alt="green_doe"
              className="green_doe doe"
              style={setStyleGreen(state.player2_position)}
            />
          </div>
          <PlayController />
        </div>
      </div>
    </PlayStateProvider>
  );
};

export default PlayGround;

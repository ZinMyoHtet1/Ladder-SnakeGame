import React, { useEffect, useReducer, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PlayStateProvider } from "./../contexts/playStateContext.js";

import Header from "./../components/Header.jsx";
import PlayController from "../components/PlayController.jsx";
import Defeat from "./Defeat.jsx";
import Victory from "./Victory.jsx";

import gameboard_img from "./../assets/game_board.jpg";
import red_doe from "./../assets/red-doe-icon.png";
import green_doe from "./../assets/green-doe-icon.png";

import "./../styles/playground.css";
import playControllerReducer from "../reducers/playControllerReducer.js";

const PlayGround = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showVictory, setShowVictory] = useState(false);
  const [showDefeat, setShowDefeat] = useState(false);
  const [stepLength, setStepLength] = useState(false);

  const initialValues = {
    mode: "",
    turn: 1,
    player1_position: 0,
    player2_position: 0,
    winner: null,
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

    const y = row * stepLength + stepLength * (row - 1);
    const x = column * stepLength + stepLength * (column - 1);
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

  function resizeHandler() {
    const width = getStepLength();
    setStepLength(width);
  }

  function getStepLength() {
    const width = window.innerWidth;
    switch (true) {
      case width > 540:
        return 25;
      case width <= 260:
        return 10;
      case width <= 320:
        return 12.5;
      case width <= 540:
        return 15;
    }
  }

  useEffect(() => {
    // initial check
    resizeHandler();
    window.addEventListener("resize", () => {
      resizeHandler();
    });
    return () => {
      window.removeEventListener("resize", () => {
        resizeHandler();
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const mode = location?.state?.mode;
    if (!mode) navigate("/", { replace: true });
    dispatch({ type: "SET_MODE", payload: mode });
    if (state?.winner && state?.winner === "Computer") {
      setShowDefeat(true);
    }
    if (state?.winner && state?.winner !== "Computer") {
      setShowVictory(true);
    }
  }, [location?.state?.mode, navigate, state?.winner]);

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
        {showVictory && <Victory setShowVictory={setShowVictory} />}
        {showDefeat && <Defeat setShowDefeat={setShowDefeat} />}
        {/* <Defeat /> */}
      </div>
    </PlayStateProvider>
  );
};

export default PlayGround;

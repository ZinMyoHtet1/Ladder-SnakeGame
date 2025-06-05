import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import gameboard_img from "./../assets/game_board.jpg";
import home_icon from "./../assets/home-icon.svg";
import red_doe from "./../assets/red-doe-icon.png";
import green_doe from "./../assets/green-doe-icon.png";
import roller_icon from "./../assets/roller-icon.svg";
import dice1 from "./../assets/dice-1.png";
import dice2 from "./../assets/dice-2.png";
import dice3 from "./../assets/dice-3.png";
import dice4 from "./../assets/dice-4.png";
import dice5 from "./../assets/dice-5.png";
import dice6 from "./../assets/dice-6.png";
import "./../styles/playground.css";

const PlayGround = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const mode = location.state.mode;

  const [dice, setDice] = useState(2);
  const [state, setState] = useState({
    mode: mode,
    turn: 1,
    player1_position: 0,
    player2_position: 0,
  });
  const [onClickRoller, setOnClickRoller] = useState(false);
  const [canClickRoller, setCanClickRoller] = useState(true);
  // const diceImg = `./../assets/dice-${dice}.png`;

  const diceImages = [dice1, dice2, dice3, dice4, dice5, dice6];

  const handleHome = () => {
    navigate("/", { replace: true });
  };

  const switchTurn = () => {
    setState((initialValues) => {
      return { ...initialValues, turn: initialValues.turn === 1 ? 2 : 1 };
    });
    setCanClickRoller(true);
  };

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

  const snakesAndLadders = {
    1: 38,
    4: 14,
    9: 31,
    21: 42,
    28: 84,
    51: 67,
    72: 91,
    80: 99,
    17: 7,
    54: 34,
    62: 19,
    64: 60,
    87: 36,
    93: 73,
    95: 75,
    98: 79,
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

  const changePosition = (position) => {
    setState((initialValues) => ({
      ...initialValues,
      player1_position:
        initialValues.turn === 1 ? position : initialValues.player1_position,
      player2_position:
        initialValues.turn === 2 ? position : initialValues.player2_position,
    }));
    console.log("CHangePosition Running");
  };

  const goOneStep = (steps) => {
    setState((initialValues) => ({
      ...initialValues,
      player1_position:
        initialValues.turn === 1
          ? Math.min(initialValues.player1_position + steps, 100)
          : initialValues.player1_position,
      player2_position:
        initialValues.turn === 2
          ? Math.min(initialValues.player2_position + steps, 100)
          : initialValues.player2_position,
    }));
  };
  const setPositionWithRollNumber = (position, callback) => {
    let i;
    for (i = 0; i < position + 1; i++) {
      setTimeout(() => goOneStep(1), 1500 + 500 * (i + 1));

      if (position === i) {
        setTimeout(() => callback(position + 1), 1500 + 500 * (i + 2));
        setTimeout(() => {
          switchTurn();
        }, 1500 + 500 * (i + 3));
      }
    }
  };

  const gameStrategy = (currentPosition) => {
    const toChangePosition = snakesAndLadders[currentPosition];
    if (toChangePosition) changePosition(toChangePosition);
  };

  const handleRoll = () => {
    if (!canClickRoller) return;
    setCanClickRoller(false);
    setOnClickRoller(true);
    let randomNumber;
    const getRandomNumber = () => {
      const rn = Math.floor(Math.random() * 6);
      setDice(rn);
      randomNumber = rn;
      console.log(rn, "ran");
    };
    const interval = setInterval(() => getRandomNumber(), 200);

    setTimeout(() => clearInterval(interval), 2000);

    setTimeout(() => {
      setPositionWithRollNumber(randomNumber, (position) => {
        const currentPosition =
          state.turn === 1 ? state.player1_position : state.player2_position;
        gameStrategy(currentPosition + position);
      });
      setOnClickRoller(false);
    }, 2000);
  };

  const setRollBtnStyle = () => {
    if (state.mode === "computer" && state.turn === 2) {
      return {
        opacity: "0.4",
      };
    }
    if (onClickRoller) {
      return {
        opacity: "1",
        animation: "rotate_roller linear 0.5s infinite normal",
      };
    }
    // animation: rotate_roller ease-in 2s infinite normal;
    return {
      opacity: "1",
      animation: "rotate_roller linear 7s infinite normal",
    };
  };

  const playAuto = () => {
    setCanClickRoller(true);
    handleRoll();
  };

  useEffect(() => {
    if (state.turn === 2 && mode === "computer") {
      setCanClickRoller(false);
      setTimeout(() => playAuto(), 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, state.turn]);

  return (
    <div className="playground_page page">
      <div className="wrapper">
        <div className="header">
          <div className="home_btn btn" onClick={handleHome}>
            <img src={home_icon} alt="home_icon" />
            <span>Home</span>
          </div>
        </div>
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
        <div className="bottom_container">
          <div className="player_box">
            <div className="player_name">Player 1</div>
            <div className="position">{state.player1_position}</div>
            <img
              src={red_doe}
              alt="red_doe"
              className={`red_doe ${state.turn === 1 ? "animate" : ""}`}
            />
          </div>
          <div className="dice_container">
            <img src={diceImages[dice]} alt="dice" className="dice" />
            <img
              src={roller_icon}
              alt="roller"
              style={setRollBtnStyle()}
              className="roller btn onClick"
              onClick={handleRoll}
            />
          </div>
          <div className="player_box right">
            <div className="player_name">
              {state.mode === "computer" ? "Computer" : "Player 2"}
            </div>
            <div className="position">{state.player2_position}</div>
            <img
              src={green_doe}
              alt="green_doe doe_icon"
              className={`green_doe ${state.turn === 2 ? "animate" : ""}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayGround;

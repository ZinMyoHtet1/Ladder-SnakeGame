import React, { useState, useContext, useEffect } from "react";
import { PlayStateContext } from "../contexts/playStateContext";

import roller_icon from "./../assets/roller-icon.svg";
import red_doe from "./../assets/red-doe-icon.png";
import green_doe from "./../assets/green-doe-icon.png";
import dice1 from "./../assets/dice-1.png";
import dice2 from "./../assets/dice-2.png";
import dice3 from "./../assets/dice-3.png";
import dice4 from "./../assets/dice-4.png";
import dice5 from "./../assets/dice-5.png";
import dice6 from "./../assets/dice-6.png";

import "./../styles/playController.css";

function PlayController() {
  const { state, dispatch } = useContext(PlayStateContext);
  const [onClickRoller, setOnClickRoller] = useState(false);
  const [canClickRoller, setCanClickRoller] = useState(true);
  const [dice, setDice] = useState(2);

  const diceImages = [dice1, dice2, dice3, dice4, dice5, dice6];
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

  const switchTurn = () => {
    dispatch({ type: "SWITCH_TURN" });
    setCanClickRoller(true);
  };

  const checkWinner = () => {
    dispatch({ type: "CHECK_WINNER" });
  };

  const goOneStep = (steps) => {
    dispatch({ type: "GO_ONE_STEP", payload: steps });
  };

  const setPositionWithRollNumber = (position, callback) => {
    let i;
    for (i = 0; i < position + 1; i++) {
      setTimeout(() => goOneStep(1), 1500 + 500 * (i + 1));

      if (position === i) {
        setTimeout(() => callback(position + 1), 1500 + 500 * (i + 2));
        if (state.winner) return;

        setTimeout(() => {
          checkWinner();
          switchTurn();
        }, 1500 + 500 * (i + 3));
      }
    }
  };

  const changePosition = (position) => {
    dispatch({ type: "CHANGE_POSITION", payload: position });
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

  const playAuto = () => {
    setCanClickRoller(true);
    handleRoll();
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

  useEffect(() => {
    if (state.turn === 2 && state.mode === "computer") {
      setCanClickRoller(false);
      setTimeout(() => {
        if (state.winner) return;
        playAuto();
      }, 1000);
    }
    if (state.winner) {
      setCanClickRoller(false);
    } else {
      setCanClickRoller(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.mode, state.turn, state.winner]);

  return (
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
  );
}

export default PlayController;

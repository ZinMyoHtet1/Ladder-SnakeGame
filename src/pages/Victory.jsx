import React, { useContext } from "react";
import "./../styles/victory.css";

import victory_trophy from "./../assets/trophy.png";
import celebrate_icon from "./../assets/celebrate-icon.png";
import { useNavigate } from "react-router-dom";
import { PlayStateContext } from "../contexts/playStateContext";
function Victory({ setShowVictory }) {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(PlayStateContext);

  const handleBackHome = () => {
    navigate("/", { replace: true });
  };

  const handleRestart = () => {
    dispatch({ type: "RESTART_GAME" });
    setShowVictory(false);
  };
  return (
    <div className="victory_overlay overlay">
      <div className="wrapper">
        <img src={victory_trophy} className="victory_trophy" alt="victory" />
        <div className="victory_message">
          <img
            src={celebrate_icon}
            alt="celebrate_icon"
            className="celebrate_icon"
          />
          <span>CONGRATULATIONS</span>
          <img
            src={celebrate_icon}
            alt="celebrate_icon"
            className="celebrate_icon"
          />
        </div>
        <div className="victory_content">
          {state.winner} Win{state.winner === "You" ? "" : "s"} the Game!
        </div>
        <div className="btn_container">
          <button className="btn" onClick={handleRestart}>
            Play Again
          </button>
          <button className="btn" onClick={handleBackHome}>
            Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default Victory;

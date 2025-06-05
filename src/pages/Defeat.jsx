import React, { useContext } from "react";
import "./../styles/defeat.css";

import defeat_trophy from "./../assets/trophy-lose.png";
import { PlayStateContext } from "../contexts/playStateContext";
import { useNavigate } from "react-router-dom";
function Defeat({ setShowDefeat }) {
  const navigate = useNavigate();
  const { dispatch } = useContext(PlayStateContext);

  const handleBackHome = () => {
    navigate("/", { replace: true });
  };

  const handleRestart = () => {
    dispatch({ type: "RESTART_GAME" });
    setShowDefeat(false);
  };
  return (
    <div className="defeat_overlay overlay">
      <div className="wrapper">
        <img src={defeat_trophy} className="defeat_trophy" alt="defeat" />
        <div className="defeat_message">
          {/* <img
            src={celebrate_icon}
            alt="celebrate_icon"
            className="celebrate_icon"
          /> */}
          <span>UNFORTUNATELY</span>
          {/* <img
            src={celebrate_icon}
            alt="celebrate_icon"
            className="celebrate_icon"
          /> */}
        </div>
        <div className="defeat_content">You Lose the Game!</div>
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

export default Defeat;

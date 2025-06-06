import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import home_icon from "./../assets/home-icon.png";
import restart_icon from "./../assets/restart-icon.png";
import { PlayStateContext } from "../contexts/playStateContext";

import "./../styles/header.css";

function Header() {
  const navigate = useNavigate();
  const { dispatch } = useContext(PlayStateContext);
  const handleHome = () => {
    navigate("/", { replace: true });
  };

  const handleRestart = () => {
    dispatch({ type: "RESTART_GAME" });
  };
  return (
    <div className="header">
      <div className="app_name">Ladders & Snakes</div>
      <div className="btn_container">
        <div className="home_btn btn" onClick={handleHome}>
          <img src={home_icon} alt="home_icon" />
          <span>Home</span>
        </div>
        <div className="restart_btn btn" onClick={handleRestart}>
          <img src={restart_icon} alt="home_icon" />
          <span>Restart</span>
        </div>
      </div>
    </div>
  );
}

export default Header;

import React from "react";
import { useNavigate } from "react-router-dom";

import "./../styles/home.css";

const Home = () => {
  const navigate = useNavigate();

  const handlePlayFriend = () => {
    navigate("playground", { replace: true, state: { mode: "friend" } });
  };
  const handlePlayComputer = () => {
    navigate("playground", { replace: true, state: { mode: "computer" } });
  };

  return (
    <div className="page home_page">
      <h1>Ladder & Snake Game</h1>
      <p>Let’s fun with playing game</p>
      <button className="btn" onClick={handlePlayFriend}>
        Play With Friend
      </button>
      <button className="btn" onClick={handlePlayComputer}>
        Play With Computer
      </button>
    </div>
  );
};

export default Home;

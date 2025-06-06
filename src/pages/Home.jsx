import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./../styles/home.css";
import Loading from "./Loading";

const Home = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const handlePlayFriend = () => {
    navigate("playground", { replace: true, state: { mode: "friend" } });
  };
  const handlePlayComputer = () => {
    navigate("playground", { replace: true, state: { mode: "computer" } });
  };
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 3000);
  }, []);
  return (
    <div className="page home_page">
      <h1>Ladders & Snakes Game</h1>
      <p>Let’s fun with playing game</p>
      <button className="btn" onClick={handlePlayFriend}>
        Play With Friend
      </button>
      <button className="btn" onClick={handlePlayComputer}>
        Play With Computer
      </button>
      {isLoading && <Loading />}
    </div>
  );
};

export default Home;

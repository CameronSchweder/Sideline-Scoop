import { useState, useEffect } from "react";

import "../styles/Game.css";

interface Props {
  homeTeam: string;
  awayTeam: string;
  venue: string;
  network: string;
  time: string;
}

const Game = ({ homeTeam, awayTeam, venue, network, time }: Props) => {
  return (
    <>
      <div className="gameContainer">
        <p className="time">{time}</p>
        <p className="gameDetails">
          <span className="network">{network}</span>
          <span className="teams">
            {awayTeam} @ {homeTeam}
          </span>
          <span className="venue">{venue}</span>
        </p>
      </div>
    </>
  );
};

export default Game;

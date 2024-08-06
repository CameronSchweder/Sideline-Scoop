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
        <p>{time}</p>
        <p>
          {network} -- Home: {homeTeam} | Away: {awayTeam} -- {venue}
        </p>
      </div>
    </>
  );
};

export default Game;

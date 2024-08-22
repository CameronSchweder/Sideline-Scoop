import "../styles/Game.css";

interface Props {
  homeTeam: string;
  awayTeam: string;
  venue: string;
  network: string;
  time: string;
  awayScore: string;
  homeScore: string;
}

const Game = ({
  homeTeam,
  awayTeam,
  venue,
  network,
  time,
  awayScore,
  homeScore,
}: Props) => {
  return (
    <>
      <div className="gameContainer">
        <p className="time">{time}</p>
        <p className="gameDetails">
          <span className="network">{network}</span>
          <span className="teams">
            {awayScore} {awayTeam} @ {homeTeam} {homeScore}
          </span>
          <span className="venue">{venue}</span>
        </p>
      </div>
    </>
  );
};

export default Game;

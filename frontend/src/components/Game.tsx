import "../styles/Game.css";
import * as NFLIcons from "react-nfl-logos";

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
  // Function to get the corresponding NFL icon component
  const getTeamIcon = (team: string, size: number) => {
    if (team === "JAC") team = "JAX";
    if (team === "LA") team = "LAR";
    const TeamIcon = NFLIcons[team as keyof typeof NFLIcons];
    return TeamIcon ? <TeamIcon size={size} className="teamIcon" /> : null;
  };
  return (
    <>
      <div className="gameContainer">
        <p className="time">{time}</p>
        <p className="gameDetails">
          <span className="network">{network}</span>
          <span className="teams">
            {awayScore} {getTeamIcon(awayTeam, 60)} @{" "}
            {getTeamIcon(homeTeam, 60)} {homeScore}
          </span>
          <span className="venue">{venue}</span>
        </p>
      </div>
    </>
  );
};

export default Game;

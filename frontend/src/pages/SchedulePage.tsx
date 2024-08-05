import { useState, useEffect } from "react";
import Game from "../components/Game";

interface GameData {
  id: string;
  home: { alias: string };
  away: { alias: string };
  venue: { name: string };
  broadcast?: { network?: string };
}

const SchedulePage = () => {
  const [preseasonGames, setPreseasonGames] = useState<GameData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://m01y6p3v80.execute-api.us-east-2.amazonaws.com/api/pre-schedule"
        );
        const data = await response.json();
        const games = data.external_api_response.weeks.flatMap(
          (week: { games: GameData[] }) => week.games
        );
        setPreseasonGames(games);

        console.log(games);
      } catch (error) {
        console.error("Error fetching the preseason games:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="scheduleContainer">
        {preseasonGames.map((game) => (
          <Game
            key={game.id}
            homeTeam={game.home.alias}
            awayTeam={game.away.alias}
            venue={game.venue.name}
            network={game.broadcast?.network || "TBD"}
          />
        ))}
      </div>
    </>
  );
};

export default SchedulePage;

import { useState, useEffect } from "react";
import Game from "../components/Game";

import "../styles/SchedulePage.css";

interface GameData {
  id: string;
  home: { alias: string };
  away: { alias: string };
  venue: { name: string };
  broadcast?: { network?: string };
  scheduled: string;
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

  // Formatting the dates of the games
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleString("en-US", options);
  };

  // Extracting time from the scheduled string
  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "America/New_York",
    });
  };

  const gameDates = new Set<string>();

  return (
    <>
      <div className="scheduleContainer">
        {preseasonGames.map((game) => {
          // Removing the time from the schedule date, since we only care about the day
          const date = game.scheduled.split("T")[0];

          const shouldDisplayDate = !gameDates.has(date);
          if (shouldDisplayDate) {
            gameDates.add(date);
          }
          return (
            <div>
              {shouldDisplayDate && (
                <h2 className="scheduledDate">{formatDate(game.scheduled)}</h2>
              )}
              <Game
                homeTeam={game.home.alias}
                awayTeam={game.away.alias}
                venue={game.venue.name}
                network={game.broadcast?.network || "TBD"}
                time={formatTime(game.scheduled) + " EST"}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default SchedulePage;

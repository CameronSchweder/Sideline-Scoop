import { useState, useEffect } from "react";
import Game from "../components/Game";
import WeekDropdown from "../components/WeekDropdown";

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
  const [filteredGames, setFilteredGames] = useState<GameData[]>([]);
  const [data, setData] = useState(null);
  const [weekPicked, setWeekPicked] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://m01y6p3v80.execute-api.us-east-2.amazonaws.com/api/pre-schedule"
        );
        const apiData = await response.json();

        setData(apiData);
        const games = apiData.external_api_response.weeks.flatMap(
          (week: { games: GameData[] }) => week.games
        );
        setPreseasonGames(games);

        console.log(apiData.external_api_response);
      } catch (error) {
        console.error("Error fetching the preseason games:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data && weekPicked !== "") {
      const weekIndex =
        weekPicked === "hall-of-fame"
          ? 0
          : parseInt(weekPicked.split("-")[2], 10);
      const filtered = data.external_api_response.weeks[weekIndex]?.games || [];
      setFilteredGames(filtered);
    } else {
      setFilteredGames(preseasonGames);
    }
  }, [data, weekPicked, preseasonGames]);

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

  if (!data) {
    return (
      <div className="loadingState">
        <i className="fa-solid fa-gear"></i>
      </div>
    );
  }

  return (
    <div>
      <WeekDropdown onChange={(option) => setWeekPicked(option)} />
      {filteredGames.map((game) => {
        // Converts scheduled value to EST before date extraction
        const localDate = new Date(game.scheduled).toLocaleDateString("en-US", {
          timeZone: "America/New_York",
        });

        const shouldDisplayDate = !gameDates.has(localDate);
        if (shouldDisplayDate) {
          gameDates.add(localDate);
        }
        return (
          <>
            {shouldDisplayDate && (
              <h2 className="scheduledDate">{formatDate(game.scheduled)}</h2>
            )}
            <div>
              <Game
                homeTeam={game.home.alias}
                awayTeam={game.away.alias}
                venue={game.venue.name}
                network={game.broadcast?.network || "NFL+"}
                time={formatTime(game.scheduled) + " EST"}
              />
            </div>
          </>
        );
      })}
    </div>
  );
};

export default SchedulePage;

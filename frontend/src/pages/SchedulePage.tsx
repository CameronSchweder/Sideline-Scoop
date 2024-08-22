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
  scoring?: { away_points?: string; home_points?: string };
}

const SchedulePage = () => {
  const [preseasonGames, setPreseasonGames] = useState<GameData[]>([]);
  const [regularSeasonGames, setRegularSeasonGames] = useState<GameData[]>([]);
  const [filteredGames, setFilteredGames] = useState<GameData[]>([]);
  const [preseasonData, setPreseasonData] = useState(null);
  const [regularSeasonData, setRegularSeasonData] = useState(null);
  const [weekPicked, setWeekPicked] = useState("");

  // Fetch preseason data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://m01y6p3v80.execute-api.us-east-2.amazonaws.com/api/pre-schedule"
        );
        const apiData = await response.json();

        setPreseasonData(apiData);
        const games = apiData.external_api_response.weeks.flatMap(
          (week: { games: GameData[] }) => week.games
        );
        setPreseasonGames(games);
        determineCurrentWeek(apiData.external_api_response.weeks);

        //console.log(apiData.external_api_response);
      } catch (error) {
        console.error("Error fetching the preseason games:", error);
      }
    };

    fetchData();
  }, []);

  // Fetch regular season data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://m01y6p3v80.execute-api.us-east-2.amazonaws.com/api/reg-schedule"
        );
        const apiData = await response.json();

        setRegularSeasonData(apiData);

        const games = apiData.external_api_response.weeks.flatMap(
          (week: { games: GameData[] }) => week.games
        );
        setRegularSeasonGames(games);
      } catch (error) {
        console.error("Error fetching the regular season games:", error);
      }
    };

    fetchData();
  }, []);

  /* NEED TO ADD FUNCTIONALITY TO DETERMINE CURRENT REGULAR SEASON WEEK */
  const determineCurrentWeek = (weeks: any[]) => {
    const currentDate = new Date();

    for (let i = 0; i < weeks.length; i++) {
      const week = weeks[i];
      const weekStartDate = new Date(week.games[0].scheduled);
      const weekEndDate = new Date(week.games[week.games.length - 1].scheduled);

      if (currentDate >= weekStartDate && currentDate <= weekEndDate) {
        setWeekPicked(i === 0 ? "Hall-of-Fame" : `Pre-Week-${i}`);
        return;
      } else if (currentDate < weekStartDate) {
        setWeekPicked(i === 0 ? "Hall-of-Fame" : `Pre-Week-${i}`);
        return;
      }
    }

    // Default to Hall of Fame if no match found (before all games start)
    setWeekPicked("Hall-of-Fame");
  };

  useEffect(() => {
    if (preseasonData && weekPicked !== "" && !weekPicked.startsWith("week")) {
      const preWeekIndex =
        weekPicked === "hall-of-fame"
          ? 0
          : parseInt(weekPicked.split("-")[2], 10);
      const filteredPreseason =
        preseasonData.external_api_response.weeks[preWeekIndex]?.games || [];

      setFilteredGames(filteredPreseason);
    } else if (
      regularSeasonData &&
      weekPicked != "" &&
      weekPicked.startsWith("week")
    ) {
      const regWeekIndex = parseInt(weekPicked.split("-")[1], 10) - 1;
      const filteredRegularSeason =
        regularSeasonData.external_api_response.weeks[regWeekIndex]?.games ||
        [];

      setFilteredGames(filteredRegularSeason);
    }
  }, [
    preseasonData,
    regularSeasonData,
    weekPicked,
    preseasonGames,
    regularSeasonGames,
  ]);

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

  // Show spinning gear icon if data has not been loaded in
  if (!preseasonData || !regularSeasonData) {
    return (
      <div className="loadingState">
        <i className="fa-solid fa-gear"></i>
      </div>
    );
  }

  const gameDates = new Set<string>();

  return (
    <div>
      <WeekDropdown
        onChange={(option) => setWeekPicked(option)}
        placeholder={weekPicked.replace(/-/g, " ")}
      />
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
                awayScore={game.scoring?.away_points || ""}
                homeScore={game.scoring?.home_points || ""}
              />
            </div>
          </>
        );
      })}
    </div>
  );
};

export default SchedulePage;

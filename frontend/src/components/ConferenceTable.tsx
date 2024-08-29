import "../styles/Table.css";
import { useState, useEffect } from "react";

type TeamStats = {
  teamId: string;
  teamName: string;
  wins: number;
  losses: number;
  ties: number;
  confRank: number;
  PCT: number;
  PF: number;
  PA: number;
  diff: number;
  home: string;
  road: string;
  div: string;
  conf: string;
  streak: string;
};

const ConferenceTable = ({
  selectedSeasonType,
}: {
  selectedSeasonType: string;
}) => {
  const [teamStats, setTeamStats] = useState<TeamStats[]>([]);
  const [dataLoaded, setDataLoaded] = useState(null);

  // Fetch season statistics
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url =
          selectedSeasonType === "reg"
            ? "https://m01y6p3v80.execute-api.us-east-2.amazonaws.com/api/reg-team-stats/"
            : "https://m01y6p3v80.execute-api.us-east-2.amazonaws.com/api/pre-team-stats/";
        const response = await fetch(url);
        const data = await response.json();
        const sortedData = data.team_stats.sort(
          (a: TeamStats, b: TeamStats) => a.confRank - b.confRank
        );
        setTeamStats(sortedData);
        setDataLoaded(sortedData);
      } catch (error) {
        console.error("Error fetching the preseason statistics:", error);
      }
    };

    fetchData();
  }, [selectedSeasonType]);

  // Show spinning gear icon if data has not been loaded in
  if (!dataLoaded) {
    return (
      <div className="loadingState">
        <i className="fa-solid fa-gear"></i>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div className="table-container">
        <table className="afc-table">
          <caption className="table-caption">AFC Standings</caption>
          <thead>
            <tr>
              <th>AFC Team</th>
              <th>W</th>
              <th>L</th>
              <th>T</th>
              <th>Rank</th>
              <th>PCT</th>
              <th>PF</th>
              <th>PA</th>
              <th>DIFF</th>
              <th>Home</th>
              <th>Road</th>
              <th>Strk</th>
            </tr>
          </thead>

          <tbody>
            {teamStats.length > 0 ? (
              teamStats
                .filter((team) => team.conf === "AFC")
                .map((team) => (
                  <tr key={team.teamId}>
                    <td>{team.teamName}</td>
                    <td>{team.wins}</td>
                    <td>{team.losses}</td>
                    <td>{team.ties}</td>
                    <td>{team.confRank}</td>
                    <td>{team.PCT.toFixed(3)}</td>
                    <td>{team.PF}</td>
                    <td>{team.PA}</td>
                    <td>{team.diff}</td>
                    <td>{team.home}</td>
                    <td>{team.road}</td>
                    <td>{team.streak}</td>
                  </tr>
                ))
            ) : (
              <tr>
                <td>Loading...</td>
              </tr>
            )}
          </tbody>
        </table>

        <table className="nfc-table">
          <caption className="table-caption">NFC Standings</caption>
          <thead>
            <tr>
              <th>NFC Team</th>
              <th>W</th>
              <th>L</th>
              <th>T</th>
              <th>Rank</th>
              <th>PCT</th>
              <th>PF</th>
              <th>PA</th>
              <th>DIFF</th>
              <th>Home</th>
              <th>Road</th>
              <th>Strk</th>
            </tr>
          </thead>

          <tbody>
            {teamStats.length > 0 ? (
              teamStats
                .filter((team) => team.conf === "NFC")
                .map((team) => (
                  <tr key={team.teamId}>
                    <td>{team.teamName}</td>
                    <td>{team.wins}</td>
                    <td>{team.losses}</td>
                    <td>{team.ties}</td>
                    <td>{team.confRank}</td>
                    <td>{team.PCT.toFixed(3)}</td>
                    <td>{team.PF}</td>
                    <td>{team.PA}</td>
                    <td>{team.diff}</td>
                    <td>{team.home}</td>
                    <td>{team.road}</td>
                    <td>{team.streak}</td>
                  </tr>
                ))
            ) : (
              <tr>
                <td>Loading...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConferenceTable;

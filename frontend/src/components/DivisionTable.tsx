import { useState, useEffect } from "react";
import * as NFLIcons from "react-nfl-logos";

import "../styles/Table.css";

type TeamStats = {
  teamId: string;
  teamName: string;
  teamAlias: string;
  wins: number;
  losses: number;
  ties: number;
  divRank: number;
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

const DivisionTable = ({
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
          (a: TeamStats, b: TeamStats) => a.divRank - b.divRank
        );
        setTeamStats(sortedData);
        setDataLoaded(sortedData);
      } catch (error) {
        console.error("Error fetching the preseason statistics:", error);
      }
    };

    fetchData();
  }, [selectedSeasonType]);

  // Function to get the corresponding NFL icon component
  const getTeamIcon = (team: string, size: number) => {
    if (team === "JAC") team = "JAX";
    if (team === "LA") team = "LAR";
    const TeamIcon = NFLIcons[team as keyof typeof NFLIcons];
    return TeamIcon ? <TeamIcon size={size} className="teamIcon" /> : null;
  };

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
        <table className="afc-east-table">
          <caption className="table-caption">AFC Standings</caption>
          <thead>
            <tr>
              <th>AFC East</th>
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
                .filter((team) => team.div === "AFC East")
                .map((team) => (
                  <tr key={team.teamId}>
                    <td className="teamCell">
                      {" "}
                      {getTeamIcon(team.teamAlias, 40)} {team.teamName}
                    </td>
                    <td>{team.wins}</td>
                    <td>{team.losses}</td>
                    <td>{team.ties}</td>
                    <td>{team.divRank}</td>
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

        <table className="afc-north-table">
          <thead>
            <tr>
              <th>AFC North</th>
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
                .filter((team) => team.div === "AFC North")
                .map((team) => (
                  <tr key={team.teamId}>
                    <td className="teamCell">
                      {" "}
                      {getTeamIcon(team.teamAlias, 40)} {team.teamName}
                    </td>
                    <td>{team.wins}</td>
                    <td>{team.losses}</td>
                    <td>{team.ties}</td>
                    <td>{team.divRank}</td>
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

        <table className="afc-sotuh-table">
          <thead>
            <tr>
              <th>AFC South</th>
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
                .filter((team) => team.div === "AFC South")
                .map((team) => (
                  <tr key={team.teamId}>
                    <td className="teamCell">
                      {" "}
                      {getTeamIcon(team.teamAlias, 40)} {team.teamName}
                    </td>
                    <td>{team.wins}</td>
                    <td>{team.losses}</td>
                    <td>{team.ties}</td>
                    <td>{team.divRank}</td>
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

        <table className="afc-west-table">
          <thead>
            <tr>
              <th>AFC West</th>
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
                .filter((team) => team.div === "AFC West")
                .map((team) => (
                  <tr key={team.teamId}>
                    <td className="teamCell">
                      {" "}
                      {getTeamIcon(team.teamAlias, 40)} {team.teamName}
                    </td>
                    <td>{team.wins}</td>
                    <td>{team.losses}</td>
                    <td>{team.ties}</td>
                    <td>{team.divRank}</td>
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

        <table className="nfc-east-table">
          <caption className="table-caption">NFC Standings</caption>
          <thead>
            <tr>
              <th>NFC East</th>
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
                .filter((team) => team.div === "NFC East")
                .map((team) => (
                  <tr key={team.teamId}>
                    <td className="teamCell">
                      {" "}
                      {getTeamIcon(team.teamAlias, 40)} {team.teamName}
                    </td>
                    <td>{team.wins}</td>
                    <td>{team.losses}</td>
                    <td>{team.ties}</td>
                    <td>{team.divRank}</td>
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

        <table className="nfc-north-table">
          <thead>
            <tr>
              <th>NFC North</th>
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
                .filter((team) => team.div === "NFC North")
                .map((team) => (
                  <tr key={team.teamId}>
                    <td className="teamCell">
                      {" "}
                      {getTeamIcon(team.teamAlias, 40)} {team.teamName}
                    </td>
                    <td>{team.wins}</td>
                    <td>{team.losses}</td>
                    <td>{team.ties}</td>
                    <td>{team.divRank}</td>
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

        <table className="nfc-sotuh-table">
          <thead>
            <tr>
              <th>NFC South</th>
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
                .filter((team) => team.div === "NFC South")
                .map((team) => (
                  <tr key={team.teamId}>
                    <td className="teamCell">
                      {" "}
                      {getTeamIcon(team.teamAlias, 40)} {team.teamName}
                    </td>
                    <td>{team.wins}</td>
                    <td>{team.losses}</td>
                    <td>{team.ties}</td>
                    <td>{team.divRank}</td>
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

        <table className="nfc-west-table">
          <thead>
            <tr>
              <th>NFC West</th>
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
                .filter((team) => team.div === "NFC West")
                .map((team) => (
                  <tr key={team.teamId}>
                    <td className="teamCell">
                      {" "}
                      {getTeamIcon(team.teamAlias, 40)} {team.teamName}
                    </td>
                    <td>{team.wins}</td>
                    <td>{team.losses}</td>
                    <td>{team.ties}</td>
                    <td>{team.divRank}</td>
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

export default DivisionTable;

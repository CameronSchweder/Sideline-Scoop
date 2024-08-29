import LeagueTable from "../components/LeagueTable";
import ConferenceTable from "../components/ConferenceTable";
import DivisionTable from "../components/DivisionTable";
import "../styles/StandingsPage.css";

import { useState } from "react";

const StandingsPage = () => {
  const [activeButton, setActiveButton] = useState<string | null>(
    localStorage.getItem("activeButton") || "League"
  );
  const [selectedSeasonType, setSelectedSeasonType] = useState<string>("pre");
  const [standingsType, setStandingsType] = useState<string>(
    localStorage.getItem("activeButton") || "League"
  );

  const handleButtonClick = (buttonName: string) => {
    setStandingsType(buttonName);
    setActiveButton(buttonName);
    localStorage.setItem("activeButton", buttonName);
  };

  const handleSeasonChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSeasonType(event.target.value);
  };

  return (
    <>
      <div className="standings-menu">
        <ul className="button-list">
          <li>
            <button
              className={activeButton === "Division" ? "active" : ""}
              onClick={() => handleButtonClick("Division")}
            >
              Division
            </button>
          </li>
          <li>
            <button
              className={activeButton === "Conference" ? "active" : ""}
              onClick={() => handleButtonClick("Conference")}
            >
              Conference
            </button>
          </li>
          <li>
            <button
              className={activeButton === "League" ? "active" : ""}
              onClick={() => handleButtonClick("League")}
            >
              League
            </button>
          </li>
        </ul>
      </div>

      <div className="season-selector">
        <select id="season-dropdown" onChange={handleSeasonChange}>
          <option value="pre">Preseason</option>
          <option value="reg">Regular Season</option>
        </select>
      </div>

      {standingsType === "League" && (
        <LeagueTable selectedSeasonType={selectedSeasonType} />
      )}
      {standingsType === "Conference" && (
        <ConferenceTable selectedSeasonType={selectedSeasonType} />
      )}
      {standingsType === "Division" && (
        <DivisionTable selectedSeasonType={selectedSeasonType} />
      )}
    </>
  );
};

export default StandingsPage;

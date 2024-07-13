import "../styles/TestPage.css";
import { useState, useEffect } from "react";

const api_key = "nh20javGLz1fLfyr5yXH5atzs06uC6ya7WcfqboT";
const lions_team_id = "c5a59daa-53a7-4de0-851f-fb12be893e9e";

const [players, setPlayers] = useState([]);

const fetchInfo = () => {
  fetch(
    "https://api.sportradar.com/nfl/official/trial/v7/en/teams/c5a59daa-53a7-4de0-851f-fb12be893e9e/full_roster.json?api_key=nh20javGLz1fLfyr5yXH5atzs06uC6ya7WcfqboT"
  )
    .then((response) => response.json())
    .then((data) => setPlayers(data));
};

useEffect(() => {
  fetchInfo();
}, []);

const TestPage = () => {
  return <h1>Hello World</h1>;
};

export default TestPage;

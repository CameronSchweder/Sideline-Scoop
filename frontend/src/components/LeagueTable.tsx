import "../styles/Table.css";
import { useState, useEffect } from "react";

const LeagueTable = () => {
  const teams = [
    { name: "49ers", id: "f0e724b0-4cbf-495a-be47-013907608da9" },
    { name: "Bears", id: "7b112545-38e6-483c-a55c-96cf6ee49cb8" },
    { name: "Bengals", id: "ad4ae08f-d808-42d5-a1e6-e9bc4e34d123" },
    { name: "Bills", id: "768c92aa-75ff-4a43-bcc0-f2798c2e1724" },
    { name: "Broncos", id: "ce92bd47-93d5-4fe9-ada4-0fc681e6caa0" },
    { name: "Browns", id: "d5a2eb42-8065-4174-ab79-0a6fa820e35e" },
    { name: "Buccaneers", id: "4254d319-1bc7-4f81-b4ab-b5e6f3402b69" },
    { name: "Cardinals", id: "de760528-1dc0-416a-a978-b510d20692ff" },
    { name: "Chargers", id: "1f6dcffb-9823-43cd-9ff4-e7a8466749b5" },
    { name: "Chiefs", id: "6680d28d-d4d2-49f6-aace-5292d3ec02c2" },
    { name: "Colts", id: "82cf9565-6eb9-4f01-bdbd-5aa0d472fcd9" },
    { name: "Commanders", id: "22052ff7-c065-42ee-bc8f-c4691c50e624" },
    { name: "Cowboys", id: "e627eec7-bbae-4fa4-8e73-8e1d6bc5c060" },
    { name: "Dolphins", id: "4809ecb0-abd3-451d-9c4a-92a90b83ca06" },
    { name: "Eagles", id: "386bdbf9-9eea-4869-bb9a-274b0bc66e80" },
    { name: "Falcons", id: "e6aa13a4-0055-48a9-bc41-be28dc106929" },
    { name: "Giants", id: "04aa1c9d-66da-489d-b16a-1dee3f2eec4d" },
    { name: "Jaguars", id: "f7ddd7fa-0bae-4f90-bc8e-669e4d6cf2de" },
    { name: "Jets", id: "5fee86ae-74ab-4bdd-8416-42a9dd9964f3" },
    { name: "Lions", id: "c5a59daa-53a7-4de0-851f-fb12be893e9e" },
    { name: "Packers", id: "a20471b4-a8d9-40c7-95ad-90cc30e46932" },
    { name: "Panthers", id: "f14bf5cc-9a82-4a38-bc15-d39f75ed5314" },
    { name: "Patriots", id: "97354895-8c77-4fd4-a860-32e62ea7382a" },
    { name: "Raiders", id: "7d4fcc64-9cb5-4d1b-8e75-8a906d1e1576" },
    { name: "Rams", id: "2eff2a03-54d4-46ba-890e-2bc3925548f3" },
    { name: "Ravens", id: "ebd87119-b331-4469-9ea6-d51fe3ce2f1c" },
    { name: "Saints", id: "0d855753-ea21-4953-89f9-0e20aff9eb73" },
    { name: "Seahawks", id: "3d08af9e-c767-4f88-a7dc-b920c6d2b4a8" },
    { name: "Steelers", id: "cb2f9f1f-ac67-424e-9e72-1475cb0ed398" },
    { name: "TBD", id: "23ed0bf0-f058-11ee-9989-93cc4251593a" },
    { name: "Texans", id: "82d2d380-3834-4938-835f-aec541e5ece7" },
    { name: "Titans", id: "d26a1ca5-722d-4274-8f97-c92e49c96315" },
    { name: "Vikings", id: "33405046-04ee-4058-a950-d606f8c30852" },
  ];

  return (
    <div className="wrapper">
      <div className="table-container">
        <table>
          <caption>NFL League Standings</caption>

          <tr>
            <th>NFL Team</th>
            <th>W</th>
            <th>L</th>
            <th>T</th>
            <th>PCT</th>
            <th>PF</th>
            <th>PA</th>
          </tr>

          <tr>
            <td data-cell="nfl-team">Arizona Cardinals</td>
            <td data-cell="w">0</td>
            <td data-cell="l">2</td>
            <td data-cell="t">0</td>
            <td data-cell="pct">.000</td>
            <td data-cell="pf">27</td>
            <td data-cell="pa">37</td>
          </tr>

          <tr>
            <td data-cell="nfl-team">Atlanta Falcons</td>
            <td data-cell="w">0</td>
            <td data-cell="l">2</td>
            <td data-cell="t">0</td>
            <td data-cell="pct">.000</td>
            <td data-cell="pf">25</td>
            <td data-cell="pa">33</td>
          </tr>
          <tr>
            <td data-cell="nfl-team">Baltimore Ravens</td>
            <td data-cell="w">1</td>
            <td data-cell="l">1</td>
            <td data-cell="t">0</td>
            <td data-cell="pct">.500</td>
            <td data-cell="pf">26</td>
            <td data-cell="pa">28</td>
          </tr>
          <tr>
            <td data-cell="nfl-team">Buffalo Bills</td>
            <td data-cell="w">1</td>
            <td data-cell="l">1</td>
            <td data-cell="t">0</td>
            <td data-cell="pct">.500</td>
            <td data-cell="pf">15</td>
            <td data-cell="pa">36</td>
          </tr>
          <tr>
            <td data-cell="nfl-team">Carolina Panthers</td>
            <td data-cell="w">0</td>
            <td data-cell="l">2</td>
            <td data-cell="t">0</td>
            <td data-cell="pct">.000</td>
            <td data-cell="pf">15</td>
            <td data-cell="pa">32</td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default LeagueTable;

import "../styles/Table.css";

const LeagueTable = () => {
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

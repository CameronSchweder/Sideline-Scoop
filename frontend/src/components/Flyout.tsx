import React, { useState } from "react";
import { flyoutTeams } from "./FlyoutTeams";
import { Link } from "react-router-dom";

import "../styles/Flyout.css";

const Flyout = () => {
  const [flyout, setFlyout] = useState(false);
  return (
    <>
      <ul
        className={flyout ? "teams-submenu clicked" : "teams-submenu"}
        onClick={() => setFlyout(!flyout)}
      >
        {flyoutTeams.map((item) => {
          return (
            <li key={item.id}>
              <Link
                to={"/test"}
                className={item.cName}
                onClick={() => setFlyout(false)}
              >
                <img src={item.logo} />
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Flyout;

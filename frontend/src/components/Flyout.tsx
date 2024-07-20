import React, { useState } from "react";
import { flyoutTeams } from "./FlyoutTeams";
import { Link } from "react-router-dom";

import "../styles/Flyout.css";

const Flyout = () => {
  return (
    <>
      <ul className="teams-submenu">
        {flyoutTeams.map((item) => {
          return (
            <li key={item.id}>
              <Link to={"/home"} className={item.cName}>
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Flyout;

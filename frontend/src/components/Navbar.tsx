import { useState } from "react";
import { Link } from "react-router-dom";

import "../styles/Navbar.css";

const Navbar = () => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  const handleLinkClick = () => {
    if (clicked) {
      setClicked(false);
    }
  };

  return (
    <>
      <nav>
        <Link to={"/nfl-schedule"}>
          <i
            className="fa-solid fa-house fa-xl"
            style={{ color: "#feffff" }}
          ></i>
        </Link>

        <div>
          <ul id="navbar" className={clicked ? "#navbar active" : "navbar"}>
            <li>
              <Link to={"/nfl-news"} onClick={handleLinkClick}>
                News
              </Link>
            </li>
            <li>
              <Link to={"/nfl-schedule"} onClick={handleLinkClick}>
                Schedule
              </Link>
            </li>
            <li>
              <Link to={"/nfl-standings"} onClick={handleLinkClick}>
                Standings
              </Link>
            </li>
            <li>
              <Link to={"/nfl-players"} onClick={handleLinkClick}>
                Players
              </Link>
            </li>
          </ul>
        </div>

        <div id="mobile" onClick={handleClick}>
          <i id="bar" className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

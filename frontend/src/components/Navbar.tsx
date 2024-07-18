import { useState } from "react";

import "../styles/Navbar.css";

const Navbar = () => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <>
      <nav>
        <a href="/home">
          <svg
            id="logo-72"
            width="52"
            height="44"
            viewBox="0 0 53 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {" "}
            <path
              d="M23.2997 0L52.0461 28.6301V44H38.6311V34.1553L17.7522 13.3607L13.415 13.3607L13.415 44H0L0 0L23.2997 0ZM38.6311 15.2694V0L52.0461 0V15.2694L38.6311 15.2694Z"
              className="ccustom"
              fill="#212326"
            ></path>{" "}
          </svg>
        </a>

        <div>
          <ul id="navbar" className={clicked ? "#navbar active" : "navbar"}>
            <li>
              <a href="/home">News</a>
            </li>
            <li>
              <a href="/home">Schedule</a>
            </li>
            <li>
              <a href="/home">Standings</a>
            </li>
            <li>
              <a href="/home">Players</a>
            </li>
            <li>
              <a href="/home">Teams</a>
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

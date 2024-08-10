import React from "react";
import Select, { StylesConfig } from "react-select";

import "../styles/WeekDropdown.css";

const options = [
  { value: "hall-of-fame", label: "Hall of Fame" },
  { value: "pre-week-1", label: "Pre Week 1" },
  { value: "pre-week-2", label: "Pre Week 2" },
  { value: "pre-week-3", label: "Pre Week 3" },
];

const customStyles: StylesConfig = {
  control: (provided) => ({
    ...provided,
    width: "400px",
  }),
  menu: (provided) => ({
    ...provided,
    width: "400px",
  }),
};

const WeekDropdown = () => {
  return (
    <div>
      <Select
        className="dropdown"
        options={options}
        styles={customStyles}
      ></Select>
    </div>
  );
};

export default WeekDropdown;

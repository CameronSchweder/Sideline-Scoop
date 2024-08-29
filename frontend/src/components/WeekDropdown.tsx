import React from "react";
import Select, { StylesConfig } from "react-select";

import "../styles/WeekDropdown.css";

const options = [
  { value: "hall-of-fame", label: "Hall of Fame" },
  { value: "pre-week-1", label: "Pre Week 1" },
  { value: "pre-week-2", label: "Pre Week 2" },
  { value: "pre-week-3", label: "Pre Week 3" },
  { value: "Week-1", label: "Week 1" },
  { value: "Week-2", label: "Week 2" },
  { value: "Week-3", label: "Week 3" },
  { value: "Week-4", label: "Week 4" },
  { value: "Week-5", label: "Week 5" },
  { value: "Week-6", label: "Week 6" },
  { value: "Week-7", label: "Week 7" },
  { value: "Week-8", label: "Week 8" },
  { value: "Week-9", label: "Week 9" },
  { value: "Week-10", label: "Week 10" },
  { value: "Week-11", label: "Week 11" },
  { value: "Week-12", label: "Week 12" },
  { value: "Week-13", label: "Week 13" },
  { value: "Week-14", label: "Week 14" },
  { value: "Week-15", label: "Week 15" },
  { value: "Week-16", label: "Week 16" },
  { value: "Week-17", label: "Week 17" },
  { value: "Week-18", label: "Week 18" },
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

interface WeekDropdownProps {
  onChange: (option: string) => void;
  placeholder: string;
}

const WeekDropdown: React.FC<WeekDropdownProps> = ({
  onChange,
  placeholder,
}) => {
  const handleChange = (selectedOption: any) => {
    onChange(selectedOption.value);
  };

  return (
    <div className="dropdown-container">
      <Select
        className="dropdown"
        options={options}
        styles={customStyles}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default WeekDropdown;

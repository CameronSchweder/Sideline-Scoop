import React from "react";
import Select, { StylesConfig } from "react-select";

import "../styles/WeekDropdown.css";

const options = [
  { value: "hall-of-fame", label: "Hall of Fame" },
  { value: "pre-week-1", label: "Pre Week 1" },
  { value: "pre-week-2", label: "Pre Week 2" },
  { value: "pre-week-3", label: "Pre Week 3" },
  { value: "week-1", label: "Week 1" },
  { value: "week-2", label: "Week 2" },
  { value: "week-3", label: "Week 3" },
  { value: "week-4", label: "Week 4" },
  { value: "week-5", label: "Week 5" },
  { value: "week-6", label: "Week 6" },
  { value: "week-7", label: "Week 7" },
  { value: "week-8", label: "Week 8" },
  { value: "week-9", label: "Week 9" },
  { value: "week-10", label: "Week 10" },
  { value: "week-11", label: "Week 11" },
  { value: "week-12", label: "Week 12" },
  { value: "week-13", label: "Week 13" },
  { value: "week-14", label: "Week 14" },
  { value: "week-15", label: "Week 15" },
  { value: "week-16", label: "Week 16" },
  { value: "week-17", label: "Week 17" },
  { value: "week-18", label: "Week 18" },
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
    <div>
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

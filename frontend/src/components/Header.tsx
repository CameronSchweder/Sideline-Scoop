import React from "react";

interface Props {
  children: string;
  color?: string; // Add an optional color prop
}

const Header = ({ children, color }: Props) => {
  const headerStyle = {
    color: color || "black",
  };
  return <h1 style={headerStyle}>{children}</h1>;
};

export default Header;

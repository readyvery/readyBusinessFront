import React from "react";
import LOGO from "../../../assets/icons/Header/LOGO.svg"; //로고
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <img src={LOGO} className="LOGO" alt="LOGO" />
    </div>
  );
};

export default Header;

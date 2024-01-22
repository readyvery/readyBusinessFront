import React from "react";
import "./Home.css";

const MainHome = ({ children }) => {

  return (
    <div className="Main-Box">
      {children}
    </div>
  );
};

export default MainHome;

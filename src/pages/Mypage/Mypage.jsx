import React from "react";
import NavBar from "../../components/views/NavBar/NavBar";
import MainMypage from "./MainMypage";
import "./Mypage.css";

const Mypage = () => {
  return (
    <div className="mypage-wrapper">
      <nav>
        <NavBar />
      </nav>
      <main>
        <MainMypage />
      </main>
    </div>
  );
};

export default Mypage;

import React from "react";
// import { Col, Nav, Row } from "react-bootstrap";
import Header from "../../components/views/Header/Header2";
import NavBar from "../../components/views/NavBar/NavBar";
import MainMypage from "./MainMypage";
import "./Mypage.css";

function Mypage (props) {
  return (
    <div className="mypage-wrapper">
      <Header />
      <nav>
        <NavBar />
      </nav>
      <main>
        <MainMypage />
      </main>
    </div>
  );
};

export default React.memo(Mypage);

import React from "react";
// import { Col, Nav, Row } from "react-bootstrap";
import MainMypage from "./MainMypage";
import "./Mypage.css";

function Mypage(props) {
  return (
    <div className="mypage-wrapper">
      <main>
        <MainMypage />
      </main>
    </div>
  );
}

export default Mypage;

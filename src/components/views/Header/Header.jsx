import React from "react";
import { Col, Row } from "react-bootstrap";
import LOGO from "../../../assets/icons/Header/LOGO.svg"; //로고
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <Row>
        <Col>
          <img src={LOGO} className="LOGO" alt="LOGO" />
        </Col>
        <Col></Col>
      </Row>
    </div>
  );
};

export default Header;

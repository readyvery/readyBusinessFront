import React from "react";
import { Col, Row } from "react-bootstrap";
import NavBar from "../../components/views/NavBar/NavBar";
import MainMypage from "../Mypage/MainMypage";

const Sales = () => {
  return (
    <div>
      <Row>
        <Col>
          <NavBar />
        </Col>
        <Col>
          <MainMypage />
        </Col>
      </Row>
    </div>
  );
};

export default Sales;

import React from "react";
import { Col, Row } from "react-bootstrap";
import NavBar from "../../components/views/NavBar/NavBar";
import MainInven from "./MainInven";

const Inventory = () => {
  return (
    <div>
      <Row>
        <Col>
          <NavBar />
        </Col>
        <Col>
          <MainInven />
        </Col>
      </Row>
    </div>
  );
};

export default Inventory;

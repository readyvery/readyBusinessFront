import React from "react";
import { Col, Row } from "react-bootstrap";
import NavBar from "../../components/views/NavBar/NavBar";
import MainHome from "./MainHome";

const Home = () => {
  return (
    <div>
      <Row>
        <Col xs={1}>
          <NavBar />
        </Col>
        <Col>
          <MainHome />
        </Col>
      </Row>
    </div>
  );
};

export default Home;

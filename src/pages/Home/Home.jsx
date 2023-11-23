import React from "react";
import { Col, Row } from "react-bootstrap";
import Header from "../../components/views/Header/Header";
import NavBar from "../../components/views/NavBar/NavBar";
import MainHome from "./MainHome";
import Receipt from "./Receipt";

function Home () {

  return (
    <div>
      <Header />
      <Row>
        <Col
          xs={1}
          style={{ width: "8.875rem", height: "46.25rem", padding: "0" }}
        >
          <NavBar />
        </Col>
        <Col style={{ padding: "0" }}>
          <MainHome />
        </Col>
        <Col
          xs={1}
          style={{ width: "23.75rem", height: "44.875rem", padding: "0" }}
        >
          <Receipt />
        </Col>
      </Row>
    </div>
  );
};

export default Home;

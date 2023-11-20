import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import "./MainHome.css";
import Complete from "./StatusHome/Complete";
import Progress from "./StatusHome/Progress";
import Wait from "./StatusHome/Wait";

const MainHome = () => {
  const [status, setStatus] = useState({
    Wait: true,
    Progress: false,
    Complete: false,
  });

  const onClickHandler = (e) => {
    const { name } = e.target;
    // 현재 선택된 상태
    const currentStatus = status[name];
    if (!currentStatus) {
      setStatus((prevStatus) => {
        const updatedStatus = { ...prevStatus };
        updatedStatus[name] = true; // 선택된 status를 true로 설정

        // 나머지 값들을 모두 false로 설정
        for (const key in updatedStatus) {
          if (key !== name) {
            updatedStatus[key] = false;
          }
        }
        return updatedStatus;
      });
    }
  };

  return (
    <Container className="Box">
      <Row className="status-header">
        <Col>
          <Button
            name="Wait"
            onClick={onClickHandler}
            style={{
              width: "100%",
              borderRadius: "0.875rem",
              backgroundColor: status.Wait ? "#d82356" : "#FFFFFF",
              fontFamily: status.Wait ? "ExtraBold" : "SemiBold",
              fontSize: "1.5625rem",
              color: status.Wait ? "#FFFFFF" : "#838383",
              border: "none",
            }}
          >
            대기 1
          </Button>
        </Col>
        <Col>
          <Button
            name="Progress"
            onClick={onClickHandler}
            style={{
              width: "100%",
              borderRadius: "0.875rem",
              backgroundColor: status.Progress ? "#d82356" : "#FFFFFF",
              fontFamily: status.Wait ? "ExtraBold" : "SemiBold",
              fontSize: "1.5625rem",
              color: status.Progress ? "#FFFFFF" : "#838383",
              border: "none",
            }}
          >
            제조중 0
          </Button>
        </Col>
        <Col>
          <Button
            name="Complete"
            onClick={onClickHandler}
            style={{
              width: "100%",
              borderRadius: "0.875rem",
              backgroundColor: status.Complete ? "#d82356" : "#FFFFFF",
              fontFamily: status.Wait ? "ExtraBold" : "SemiBold",
              fontSize: "1.5625rem",
              color: status.Complete ? "#FFFFFF" : "#838383",
              border: "none",
            }}
          >
            제조•픽업완료 0
          </Button>
        </Col>
      </Row>

      {status.Wait ? (
        <Wait />
      ) : status.Progress ? (
        <Progress />
      ) : status.Complete ? (
        <Complete />
      ) : (
        <div>ERROR</div>
      )}
    </Container>
  );
};

export default MainHome;

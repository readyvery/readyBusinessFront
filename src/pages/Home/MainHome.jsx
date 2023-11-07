import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

const MainHome = () => {
  const [status, setStatus] = useState({
    Wait: true,
    Progress: false,
    Complete: false,
  });

  const onClickHandler = (e) => {
    console.log(status);
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
    <Container>
      <Row>
        <Col>
          <Button name="Wait" onClick={onClickHandler}>
            대기중
          </Button>
        </Col>
        <Col>
          <Button name="Progress" onClick={onClickHandler}>
            진행중
          </Button>
        </Col>
        <Col>
          <Button name="Complete" onClick={onClickHandler}>
            완료
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>1 of 1</Col>
        <Col>2 of 2</Col>
      </Row>
    </Container>
  );
};

export default MainHome;

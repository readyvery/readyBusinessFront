import React from "react";
import { Button, Col, Row } from "react-bootstrap";

const pendingButton = ({ handleRefuseModal, handleReceiveModal }) => {
  return (
    <Row>
      <Col>
        <div className="receipt-btn__wrapper">
          <Button
            name="Reject"
            onClick={handleRefuseModal}
            style={{
              width: "6.75rem",
              height: "2.8125rem",
              border: "2px solid",
              borderRadius: "1.5625rem",
              bordercolor: "#DADADA",
              backgroundColor: "#F5F5F5",
              fontFamily: "SemiBold",
              fontSize: "1.375rem",
              color: "#838383",
              justifyContent: "center",
            }}
          >
            거부
          </Button>
        </div>
      </Col>
      <Col>
        <div className="receipt-btn__wrapper">
          <Button
            name="Accept"
            onClick={handleReceiveModal}
            style={{
              width: "6.75rem",
              height: "2.8125rem",
              border: "2px solid",
              borderRadius: "1.5625rem",
              backgroundColor: "#D82356",
              fontFamily: "SemiBold",
              fontSize: "1.375rem",
              color: "#FFFFFF",
            }}
          >
            접수
          </Button>
        </div>
      </Col>
    </Row>
  );
};

export default pendingButton;

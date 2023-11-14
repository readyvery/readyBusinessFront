import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import "./Receipt.css";

const Receipt = () => {
  const orderInfo = {
    orders: [
      {
        id: 123, //db 인덱스
        orderNum: 2, // 그날의 그가게의 주문번호
        pickUp: "픽업",
        foodies: [
          {
            name: "아메리카노",
            count: 3,
            options: ["샷 추가", "휘핑", "ICE", "그란데"],
          },
        ],
        phone: "010-6439-3547", // 고객의 전화번호
        time: "21/11/08 11:44:30", // 주문시간
        payment: "현대카드",
        price: 8500,
      },
    ],
  };
  return (
    <Container className="Box">
      {orderInfo.orders.map((order) => (
        <div className="rounded-rectangle">
          <div className="receiptHeader">
            <span className="receipt-header"> 주문번호 {order.orderNum}</span>
          </div>
          <Row className="receiptButton">
            <Col>
              <Button
                name="Reject"
                style={{
                  width: "8.75rem",
                  height: "2.8125rem",
                  border: "2px solid",
                  borderRadius: "1.5625rem",
                  bordercolor: "#DADADA",
                  backgroundColor: "#F5F5F5",
                  fontFamily: "SemiBold",
                  fontSize: "1.375rem",
                  color: "#838383",
                }}
              >
                거부
              </Button>
            </Col>
            <Col>
              <Button
                name="Accept"
                style={{
                  width: "8.75rem",
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
            </Col>
          </Row>
          <div className="receiptTextBox">
            <span className="receipt-text">주문시간</span>

            <span className="receipt-text">{order.time}</span>
          </div>
          <div className="receiptTextBox">
            <span className="receipt-text">고객연락처</span>

            <span className="receipt-text">{order.phone}</span>
          </div>
          <div className="receipt-divider" />
        </div>
      ))}
    </Container>
  );
};

export default Receipt;

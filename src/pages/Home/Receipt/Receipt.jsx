import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import X from "../../../assets/icons/X.svg";
import "./Receipt.css";

const Receipt = () => {
  const [ReceiveModal, setReceiveModal] = useState(false);
  const [RefuseModal, setRefuseModal] = useState(false);

  const handleReceiveModal = () => {
    setReceiveModal((prev) => !prev);
  };

  const handleRefuseModal = () => {
    setRefuseModal((prev) => !prev);
  };

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
    <div className="Box">
      {orderInfo.orders.map((order) => (
        <div className="rounded-rectangle">
          <div className="receiptHeader">
            <span className="receipt-header"> 주문번호 {order.orderNum}</span>
          </div>
          <Row className="receiptButton">
            <Col>
            <div className="receipt-btn__wrapper">
              <Button
                name="Reject"
                onClick={handleRefuseModal}
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
                  justifyContent: "center"
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
            </div>
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
          <div className="receiptTextBox">
            <span className="receipt-text">주문내역</span>
          </div>
          <div className="receiptTextBox">
            <span className="receipt-FoodName">{order.foodies[0].name}</span>
            <span className="receipt-text">{order.foodies[0].count}</span>
          </div>
          <div className="receiptOption">
            {order.foodies[0].options.map((option) => (
              <span className="receipt-text">└ {option}</span>
            ))}
          </div>
          <div className="receipt-divider" />
          <div className="receiptTextBox">
            <span className="receipt-text">결제수단</span>
            <span className="receipt-text">{order.payment}</span>
          </div>
          <div className="receiptTextBox">
            <span className="receipt-text">결제금액</span>
            {/* 100원 단위 ,처리 여유로우면 하기 */}
            <span className="receipt-text">{order.price}원</span>
          </div>
        </div>
      ))}
      {RefuseModal && (
        <div className="modal-wrapper">
          <div className="modal-box">
            <div className="modal-close__wrapper" onClick={handleRefuseModal}>
              <img src={X} alt="close" />
            </div>
            <div className="modal-box-txt__wrapper">
              <div className="modal-box-txt">접수 거부 사유를 선택해주세요</div>
            </div>
            <div className="modal-box-choose-btn__wrapper">
              <div className="modal-box-choose-btn">재료소진</div>
              <div className="modal-box-choose-btn">가게사정</div>
              <div className="modal-box-choose-btn">기타</div>
            </div>
          </div>
        </div>
      )}
      {ReceiveModal && (
        <div className="modal-wrapper">
          <div className="modal-box">
            <div className="modal-close__wrapper" onClick={handleReceiveModal}>
              <img src={X} alt="close" />
            </div>
            <div className="modal-box-txt__wrapper">
              <div className="modal-box-txt">제조 시간을 선택해주세요</div>
            </div>
            <div className="modal-box-choose-btn__wrapper">
              <Row>
                <Col>
                  <div className="modal-box-chooseTime-btn">5분</div>
                </Col>
                <Col>
                  <div className="modal-box-chooseTime-btn">10분</div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="modal-box-chooseTime-btn">15분</div>
                </Col>
                <Col>
                  <div className="modal-box-chooseTime-btn">20분</div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="modal-box-chooseTime-btn">25분</div>
                </Col>
                <Col>
                  <div className="modal-box-chooseTime-btn">30분</div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Receipt;

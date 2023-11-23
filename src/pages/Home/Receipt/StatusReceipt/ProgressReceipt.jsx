import React, { useState } from "react";

const ProgressReceipt = () => {
  const [ReceiveModal, setReceiveModal] = useState(false);
  const [RefuseModal, setRefuseModal] = useState(false);

  const handleReceiveModal = () => {
    console.log(ReceiveModal);
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
    <div>
      <div className="receiptHeader">
        <span className="receipt-header">
          {" "}
          주문번호 {orderInfo.orders.orderNum}
        </span>
        <div className="receipt-btn__wrapper">
          <button className="receipt-btn">제조완료</button>
        </div>
      </div>
      <div className="receiptTextBox">
        <span className="receipt-text">주문시간</span>
        <span className="receipt-text">{orderInfo.orders.time}</span>
      </div>
      <div className="receiptTextBox">
        <span className="receipt-text">고객연락처</span>
        <span className="receipt-text">{orderInfo.orders.phone}</span>
      </div>
      <div className="receipt-divider" />
      <div className="receiptTextBox">
        <span className="receipt-text">주문내역</span>
      </div>
      <div className="receiptTextBox">
        <span className="receipt-FoodName">
          {orderInfo.orders.foodies[0].name}
        </span>
        <span className="receipt-text">
          {orderInfo.orders.foodies[0].count}
        </span>
      </div>
      <div className="receiptOption">
        {orderInfo.orders.foodies[0].options.map((option) => (
          <span className="receipt-text">└ {option}</span>
        ))}
      </div>
      <div className="receipt-divider" />
      <div className="receiptTextBox">
        <span className="receipt-text">결제수단</span>
        <span className="receipt-text">{orderInfo.orders.payment}</span>
      </div>
      <div className="receiptTextBox">
        <span className="receipt-text">결제금액</span>
        {/* 100원 단위 ,처리 여유로우면 하기 */}
        <span className="receipt-text">{orderInfo.orders.price}원</span>
      </div>
    </div>
  );
};

export default ProgressReceipt;

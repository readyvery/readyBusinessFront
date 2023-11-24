import React from "react";

const CompleteReceipt = ({
  orderProps: { orderNum, time, phone, foodies, payment, price },
}) => {
  return (
    <div>
      <div className="receipt-btn__wrapper">
        <span className="receipt-header"> 주문번호 {orderNum}</span>

        <button className="receipt-btn">완료</button>
      </div>
      <div className="receiptTextBox">
        <span className="receipt-text">주문시간</span>
        <span className="receipt-text">{time}</span>
      </div>
      <div className="receiptTextBox">
        <span className="receipt-text">고객연락처</span>
        <span className="receipt-text">{phone}</span>
      </div>
      <div className="receipt-divider" />
      <div className="receiptTextBox">
        <span className="receipt-text">주문내역</span>
      </div>
      <div className="receiptTextBox">
        <span className="receipt-FoodName">{foodies[0].name}</span>
        <span className="receipt-text">{foodies[0].count}</span>
      </div>
      <div className="receiptOption">
        {foodies[0].options.map((option) => (
          <span className="receipt-text">└ {option}</span>
        ))}
      </div>
      <div className="receipt-divider" />
      <div className="receiptTextBox">
        <span className="receipt-text">결제수단</span>
        <span className="receipt-text">{payment}</span>
      </div>
      <div className="receiptTextBox">
        <span className="receipt-text">결제금액</span>
        {/* 100원 단위 ,처리 여유로우면 하기 */}
        <span className="receipt-text">{price}원</span>
      </div>
    </div>
  );
};

export default CompleteReceipt;

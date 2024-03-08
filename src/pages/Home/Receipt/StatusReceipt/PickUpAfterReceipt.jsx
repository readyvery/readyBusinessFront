import React from "react";

const PickUpAfterReceipt = ({ orderProps }) => {
  return (
    <div>
      <div className="receiptHeader">
        <span className="receipt-header"> 주문번호 {orderProps?.orderNum}</span>

        <button className="receipt-btn-pickUp">픽업완료</button>
      </div>
      <div className="receiptTextBox">
        <span className="receipt-text">주문시간</span>
        <span className="receipt-text">
          {orderProps?.time?.split("T")[0].replaceAll("-", "/")}{" "}
          {orderProps?.time?.split("T")[1].split(".")[0]}
        </span>
      </div>
      <div className="receiptTextBox">
        <span className="receipt-text">고객연락처</span>
        <span className="receipt-text">
          {orderProps?.phone?.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")}
        </span>
      </div>
      <div className="receipt-divider" />
      <div className="receiptTextBox">
        <span className="receipt-text">주문내역</span>
      </div>
      {orderProps?.foodies?.map((e, i) => (
        <React.Fragment key={i}>
          <div className="receiptTextBox">
            <span className="receipt-FoodName">{e?.name}</span>
            <span className="receipt-FoodName count">{e?.count}</span>
          </div>
          <div className="receiptOption">
            {e?.options?.map((option) => (
              <span
              className="receipt-optiontext"
              style={{
                color: (option?.price !== 0 || option?.category === "HOT/ICE"
                || option?.category === "ICE/HOT") ? "#D82356" : undefined,
                fontWeight: "500",
              }}
            >
              └ ({option?.category}) {option?.name}
            </span>
            ))}
          </div>
        </React.Fragment>
      ))}
      <div className="receipt-divider" />
      <div className="receiptTextBox">
        <span className="receipt-text">상품금액</span>
        <span className="receipt-text">{orderProps?.couponUsed ? orderProps?.price && (orderProps?.price + 500).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : orderProps?.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</span>
      </div>
      <div className="receiptTextBox">
        <span className="receipt-text">할인금액</span>
        <span className="receipt-text">{orderProps?.couponUsed ? "(-) 500원" : "0원"}</span>
      </div>
      <div className="receiptTextBox">
        <span className="receipt-text">결제금액</span>
        <span className="receipt-text">
          {orderProps?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
        </span>
      </div>
    </div>
  );
};

export default PickUpAfterReceipt;

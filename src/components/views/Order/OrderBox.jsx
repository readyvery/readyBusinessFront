import React from "react";

const OrderBox = ({
  selectOrder,
  orderProps: { orderNum, time, pickUp, price, orderSelect },
}) => {
  return (
    <>
      <div
        className={"Order-content__box"}
        style={{
          background: orderSelect.isSelected ? "#D82356" : "#fff",
          opacity: orderSelect.isSelected ? 0.15 : 1,
        }}
      >
        <span className="Order-content__span">{orderNum} </span>
        <span className="Order-content__span">{time}</span>
        <span className="Order-content__span">{pickUp}</span>
        <span className="Order-content__span">{price}원</span>
        <span className="Order-content__span"> </span>
      </div>
    </>
  );
};

export default OrderBox;

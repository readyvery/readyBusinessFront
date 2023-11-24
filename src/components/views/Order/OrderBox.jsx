import React from "react";

const OrderBox = ({ onSelect, order, selectedOrderId }) => {
  const { id, orderNum, time, pickUp, price } = order;
  const isSelected = id === selectedOrderId;

  const onClickHandler = () => {
    onSelect(isSelected ? null : order);
  };
  return (
    <>
      <div
        className={"Order-content__box"}
        onClick={onClickHandler}
        style={{
          background: isSelected ? "rgba(216, 35, 86, 0.15)" : "#fff",
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

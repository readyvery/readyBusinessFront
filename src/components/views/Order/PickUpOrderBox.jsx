import React from "react";

const PickUpOrderBox = ({ onSelect, order, selectedOrderId }) => {
  const { orderNum, time, pickUp, price } = order;
  const isSelected = order.idx === selectedOrderId;

  const onClickHandler = () => {
    onSelect(isSelected ? null : order);
  };
  return (
    <>
      <div
        className={"Order-content__box"}
        onClick={onClickHandler}
        style={{
          background: isSelected ? "rgba(216, 35, 86, 0.15)" : "#D9D9D9",
        }}
      >
        <span className="Order-content__span">{orderNum} </span>
        <span className="Order-content__span">
          <div>{time.split("T")[0].replaceAll("-", ".")}</div>
          <div>{time.split("T")[1].split(".")[0]}</div>
        </span>
        <span className="Order-content__span">
          {pickUp === 1 ? "매장" : "픽업"}
        </span>
        <span className="Order-content__span">
          {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
        </span>
        <span className="Order-content__span"> </span>
      </div>
    </>
  );
};

export default PickUpOrderBox;

const OrderBox = ({ orderProps: { orderNum, time, pickUp, price } }) => {
  return (
    <>
      <div className={"Order-content__box"}>
        <span className="Order-content__span">{orderNum} </span>
        <span className="Order-content__span">{time}</span>
        <span className="Order-content__span">{pickUp}</span>
        <span className="Order-content__span">{price}</span>
      </div>
    </>
  );
};

export default OrderBox;

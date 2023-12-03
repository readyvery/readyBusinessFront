import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { selectOrder, selectStatus } from "../../../Atom/order";
import downArrow from "../../../assets/icons/icon_downArrow_black.svg";
import upArrow from "../../../assets/icons/icon_upArrow_black.svg";
import OrderBox from "../../../components/views/Order/OrderBox";
import PickUpOrderBox from "../../../components/views/Order/PickUpOrderBox";
import "./DetailHome.css";

const Complete = ({ orderInfo, pickUpInfo }) => {
  const setOrderSelect = useSetRecoilState(selectOrder);
  const setStatusSelect = useSetRecoilState(selectStatus);
  const [view, setView] = useState(false);
  const [viewStatus, setViewStatus] = useState("All");
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  /*
  const sortedOrders = isRecentFirst
    ? [...(orderInfo?.orders || [])].sort((prev, cur) => {
        if (prev?.price > cur?.price) return -1;
        if (prev?.price < cur?.price) return 1;
        return 0;
      })
    : orderInfo?.orders;
*/

  const onClickViewer = (viewStatus) => {
    setViewStatus(viewStatus);
  };
  const Orders = orderInfo?.orders;
  const PickUps = pickUpInfo?.orders;

  const onClickHandler = (selectedOrder) => {
    setOrderSelect(selectedOrder);
    setSelectedOrderId(selectedOrder?.idx && selectedOrder?.idx);

    if (selectedOrder === null) {
      setStatusSelect("null");
    } else {
      setStatusSelect("complete");
    }
  };

  const onClickPickUpHandler = (selectedOrder) => {
    setOrderSelect(selectedOrder);
    setSelectedOrderId(selectedOrder?.idx && selectedOrder?.idx);

    if (selectedOrder === null) {
      setStatusSelect("null");
    } else {
      setStatusSelect("pickUp");
    }
  };

  useEffect(() => {
    const firstOrder = Orders?.length > 0 ? Orders[0] : null;
    setOrderSelect(firstOrder);
    setSelectedOrderId(firstOrder?.idx && firstOrder?.idx);

    if (firstOrder !== null) {
      setStatusSelect("complete");
    } else {
      setStatusSelect("null");
      setOrderSelect(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="Order-wrapper">
      <div className="Order-title__wrapper">
        <span className="Order-title__span">주문번호</span>
        <span className="Order-title__span">주문일시</span>
        <span className="Order-title__span">수령방식</span>
        <span className="Order-title__span">주문금액</span>
        <ul
          onClick={() => {
            setView(!view);
          }}
          className="Order-wrapper-dropdown"
        >
          {viewStatus === "All" ? (
            <span className="Order-dropdown-title">전체보기</span>
          ) : viewStatus === "PickUp" ? (
            <span className="Order-dropdown-title">픽업대기</span>
          ) : viewStatus === "Complete" ? (
            <span className="Order-dropdown-title">픽업완료</span>
          ) : null}{" "}
          {view ? (
            <img alt="new" className="Arrowicon" src={upArrow} />
          ) : (
            <img alt="new" className="Arrowicon" src={downArrow} />
          )}
          {view && (
            <div className="Dropdown-box">
              <span onClick={() => onClickViewer("All")}>전체보기</span>
              <span onClick={() => onClickViewer("PickUp")}>픽업대기</span>
              <span onClick={() => onClickViewer("Complete")}>픽업완료</span>
            </div>
          )}
        </ul>
      </div>
      {viewStatus === "All" && (
        <div className="Order-content__wrapper">
          {Orders?.map((order) => (
            <OrderBox
              key={order.id}
              onSelect={onClickHandler}
              order={order}
              selectedOrderId={selectedOrderId}
            />
          ))}
          {PickUps?.map((order) => (
            <PickUpOrderBox
              key={order.id}
              onSelect={onClickPickUpHandler}
              order={order}
              selectedOrderId={selectedOrderId}
            />
          ))}
        </div>
      )}
      {viewStatus === "PickUp" && (
        <div className="Order-content__wrapper">
          {Orders?.map((order) => (
            <OrderBox
              key={order.id}
              onSelect={onClickHandler}
              order={order}
              selectedOrderId={selectedOrderId}
            />
          ))}
        </div>
      )}
      {viewStatus === "Complete" && (
        <div className="Order-content__wrapper">
          {PickUps?.map((order) => (
            <PickUpOrderBox
              key={order.id}
              onSelect={onClickPickUpHandler}
              order={order}
              selectedOrderId={selectedOrderId}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Complete;

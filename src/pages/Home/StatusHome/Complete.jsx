import React, { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { selectOrder, selectStatus } from "../../../Atom/order";
import { isRecentFirstState } from "../../../Atom/status";
import downArrow from "../../../assets/icons/icon_downArrow_black.svg";
import OrderBox from "../../../components/views/Order/OrderBox";
import "./DetailHome.css";

const Complete = ({ orderInfo }) => {
  // const apiUrl = process.env.REACT_APP_API_ROOT;
  // const [orderCount, setOrderCount] = useRecoilState(ordercnt); // Recoil 상태 가져오기
  const setOrderSelect = useSetRecoilState(selectOrder);
  const setStatusSelect = useSetRecoilState(selectStatus);

  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [isRecentFirst, setIsRecentFirst] = useRecoilState(isRecentFirstState);

  /*
  const sortedOrders = isRecentFirst
    ? [...(orderInfo?.orders || [])].sort((prev, cur) => {
        if (prev?.price > cur?.price) return -1;
        if (prev?.price < cur?.price) return 1;
        return 0;
      })
    : orderInfo?.orders;
*/

  const sortedOrders = isRecentFirst
    ? [...(orderInfo?.orders || [])].reverse()
    : orderInfo?.orders;

  const onClickHandler = (selectedOrder) => {
    setOrderSelect(selectedOrder);
    setSelectedOrderId(selectedOrder?.idx && selectedOrder?.idx);

    if (selectedOrder === null) {
      setStatusSelect("null");
    } else {
      setStatusSelect("complete");
    }
  };

  useEffect(() => {
    const firstOrder = sortedOrders?.length > 0 ? sortedOrders[0] : null;
    setOrderSelect(firstOrder);
    setSelectedOrderId(firstOrder?.idx && firstOrder?.idx);

    if (firstOrder !== null) {
      setStatusSelect("complete");
    } else {
      setStatusSelect("null");
      setOrderSelect(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRecentFirst]);

  return (
    <div className="Order-wrapper">
      <div className="Order-title__wrapper">
        <span className="Order-title__span">주문번호</span>
        <span className="Order-title__span">주문일시</span>
        <span className="Order-title__span">픽업유무</span>
        <span className="Order-title__span">주문금액</span>
        {isRecentFirst ? (
          <span
            className="Order-title__span"
            onClick={() => setIsRecentFirst(!isRecentFirst)}
          >
            최신순
            <img alt="new" className="Arrowicon" src={downArrow} />
          </span>
        ) : (
          <span
            className="Order-title__span"
            onClick={() => setIsRecentFirst(!isRecentFirst)}
          >
            과거순
            <img alt="new" className="Arrowicon" src={downArrow} />
          </span>
        )}
      </div>
      <div className="Order-content__wrapper">
        {sortedOrders?.map((order) => (
          <OrderBox
            key={order.id}
            onSelect={onClickHandler}
            order={order}
            selectedOrderId={selectedOrderId}
          />
        ))}
      </div>
    </div>
  );
};

export default Complete;

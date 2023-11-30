import React, { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { selectOrder, selectStatus, selectTotal } from "../../../Atom/order";
import { isRecentFirstState, soundState } from "../../../Atom/status";
// import VeryMp3 from "../../../assets/Very.mp3";
import downArrow from "../../../assets/icons/icon_downArrow_black.svg";
import AudioPlayer from "../../../components/views/Audio/AudioPlayer";
import OrderBox from "../../../components/views/Order/OrderBox";
import "./DetailHome.css";

const Wait = ({ orderInfo }) => {
  const setOrderSelect = useSetRecoilState(selectOrder);
  const setStatusSelect = useSetRecoilState(selectStatus);
  const [orderTotal, setorderTotal] = useRecoilState(selectTotal);
  const [playSound, setplaySound] = useRecoilState(soundState);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [isRecentFirst, setIsRecentFirst] = useRecoilState(isRecentFirstState);
  const sortedOrders = isRecentFirst
    ? [...(orderInfo?.orders || [])].reverse()
    : orderInfo?.orders;

  useEffect(() => {
    const firstOrder = sortedOrders?.length > 0 ? sortedOrders[0] : null;
    setOrderSelect(firstOrder);
    setSelectedOrderId(firstOrder?.idx || null);

    if (firstOrder !== null) {
      setStatusSelect("pending");
    } else {
      setStatusSelect("null");
      setOrderSelect(null);
    }

    if (playSound && orderInfo?.orders?.length >= orderTotal) {
      AudioPlayer(); // 소리 재생
      console.log("소리 재생");
      setorderTotal(orderInfo?.orders?.length);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderInfo]);

  const onClickHandler = (selectedOrder) => {
    setOrderSelect(selectedOrder);
    setSelectedOrderId(selectedOrder?.idx && selectedOrder?.idx);

    if (selectedOrder === null) {
      setStatusSelect("null");
    } else {
      setStatusSelect("pending");
    }
    if (orderInfo?.orders?.length === null) {
      setplaySound((prev) => prev);
    }
  };

  // useEffect(() => {
  //   const firstOrder = sortedOrders?.length > 0 ? sortedOrders[0] : null;

  //   if (firstOrder !== null) {
  //     setStatusSelect("pending");
  //     setOrderSelect(firstOrder);
  //     setSelectedOrderId(firstOrder.idx);
  //   } else {
  //     setStatusSelect("null");
  //     setOrderSelect(null);
  //     setSelectedOrderId(null);
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [sortedOrders]);

  useEffect(() => {
    const sortedOrders = isRecentFirst
      ? [...(orderInfo?.orders || [])].reverse()
      : orderInfo?.orders;
    const firstOrder = sortedOrders?.length > 0 ? sortedOrders[0] : null;

    if (firstOrder !== null) {
      setStatusSelect("pending");
      setOrderSelect(firstOrder);
      setSelectedOrderId(firstOrder.idx);
    } else {
      setStatusSelect("null");
      setOrderSelect(null);
      setSelectedOrderId(null);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

export default Wait;

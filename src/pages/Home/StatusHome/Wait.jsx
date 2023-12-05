import React, { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { selectOrder, selectStatus, selectTotal } from "../../../Atom/order";
import { isRecentFirstState, soundState } from "../../../Atom/status";
import MP from "../../../assets/Very.mp3";
import downArrow from "../../../assets/icons/icon_downArrow_black.svg";
import OrderBox from "../../../components/views/Order/OrderBox";
import EffectSound from "../../../utils/EffectSound";
import "./DetailHome.css";

const Wait = ({ orderInfo }) => {
  const Mp = EffectSound(MP, 1);

  const setStatusSelect = useSetRecoilState(selectStatus);
  const [orderSelect, setOrderSelect] = useRecoilState(selectOrder);
  const [orderTotal, setorderTotal] = useRecoilState(selectTotal);
  const [playSound, setplaySound] = useRecoilState(soundState);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [isRecentFirst, setIsRecentFirst] = useRecoilState(isRecentFirstState);
  const sortedOrders = isRecentFirst
    ? [...(orderInfo?.orders || [])].reverse()
    : orderInfo?.orders;

  useEffect(() => {
    if (orderSelect === null) {
      const firstOrder = sortedOrders?.length > 0 ? sortedOrders[0] : null;
      setOrderSelect(firstOrder);
      setSelectedOrderId(firstOrder?.idx || null);

      if (firstOrder !== null) {
        setStatusSelect("pending");
      } else {
        setStatusSelect("null");
        setOrderSelect(null);
      }
    }

    /**
     * 주문 들어올 시 소리 재생
     */
    if (playSound && orderInfo?.orders?.length >= orderTotal) {
      console.log("소리 재생");
      Mp.play();
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

  const defaultOrder = () => {
    const sortedOrdersArray = isRecentFirst
      ? orderInfo?.orders
      : [...(orderInfo?.orders || [])].reverse();

    const firstOrder =
      sortedOrdersArray?.length > 0 ? sortedOrdersArray[0] : null;

    if (firstOrder !== null) {
      setStatusSelect("pending");
      setOrderSelect(firstOrder);
      setSelectedOrderId(firstOrder.idx);
    } else {
      setStatusSelect("null");
      setOrderSelect(null);
      setSelectedOrderId(null);
    }
  };

  const onClickSorter = () => {
    setIsRecentFirst(!isRecentFirst);
    defaultOrder();
  };

  useEffect(() => {
    const firstOrder = sortedOrders?.length > 0 ? sortedOrders[0] : null;
    setOrderSelect(firstOrder);
    setSelectedOrderId(firstOrder?.idx && firstOrder?.idx);

    if (firstOrder !== null) {
      setStatusSelect("pending");
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
        {isRecentFirst ? (
          <span className="Order-title__span" onClick={onClickSorter}>
            최신순
            <img alt="new" className="Arrowicon" src={downArrow} />
          </span>
        ) : (
          <span className="Order-title__span" onClick={onClickSorter}>
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

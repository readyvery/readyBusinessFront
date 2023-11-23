import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { ordercnt } from "../../../Atom/order";
import upArrow from "../../../assets/icons/icon_upArrow.svg";
import OrderBox from "../../../components/views/Order/OrderBox";
import "./DetailHome.css";

const Wait = () => {
  const [orderCount, setOrderCount] = useRecoilState(ordercnt); // Recoil 상태 가져오기

  const [orderSelect, setOrderSelect] = useState({
    orderId: null,
    isSelected: false,
  });

  const orderInfo = {
    orders: [
      {
        id: 123, //db 인덱스
        orderNum: 2, // 그날의 그가게의 주문번호
        pickUp: "픽업",
        foodies: [
          {
            name: "아메리카노",
            count: 3,
            options: ["샷 추가", "휘핑", "ICE", "그란데"],
          },
        ],
        phone: "010-6439-3547", // 고객의 전화번호
        time: "21/11/08 11:44:30", // 주문시간
        payment: "현대카드",
        price: 8500,
      },
      {
        id: 124, //db 인덱스
        orderNum: 3, // 그날의 그가게의 주문번호
        pickUp: "매장",
        foodies: [
          {
            name: "아메리카누",
            count: 3,
            options: ["샷 추가 *100 ", "휘핑 *1000", "HOT", "그란데"],
          },
        ],
        phone: "010-7679-3547", // 고객의 전화번호
        time: "23/11/08 11:44:30", // 주문시간
        payment: "현대카드",
        price: 78500,
      },
      {
        id: 125,
        orderNum: 4,
        pickUp: "픽업",
        foodies: [
          {
            name: "아메리카노",
            count: 3,
            options: ["샷 추가", "휘핑", "ICE", "그란데"],
          },
        ],
        phone: "010-6439-3547", // 고객의 전화번호
        time: "21/11/08 11:44:30", // 주문시간
        payment: "현대카드",
        price: 8500,
      },
      {
        id: 126,
        orderNum: 5,
        pickUp: "매장",
        foodies: [
          {
            name: "아메리카노",
            count: 3,
            options: ["샷 추가", "휘핑", "ICE", "그란데"],
          },
        ],
        phone: "010-6439-3547", // 고객의 전화번호
        time: "21/11/08 11:44:30", // 주문시간
        payment: "현대카드",
        price: 8500,
      },
    ],
  };

  const onClickHandler = (orderid) => {
    setOrderSelect({
      orderId: orderid,
      isSelected: !orderSelect.isSelected,
    });
  };

  useEffect(() => {
    console.log(orderCount);
    // OrderBox가 생성될 때마다 개수 증가
    setOrderCount((prev) => ({ ...prev, pending: prev.pending + 1 }));
  }, [setOrderCount]); // useEffect의 의존성 배열에 setOrderCount 추가

  return (
    <div className="Order-wrapper">
      <div className="Order-title__wrapper">
        <span className="Order-title__span">주문번호</span>
        <span className="Order-title__span">주문일시</span>
        <span className="Order-title__span">픽업유무</span>
        <span className="Order-title__span">주문금액</span>
        <span className="Order-title__span">
          <img className="Arrowicon" src={upArrow} />
          최신순
        </span>
      </div>
      <div className="Order-content__wrapper">
        {orderInfo.orders.map((order) => (
          <OrderBox
            key={order.id}
            selectOrder={onClickHandler}
            orderProps={{
              orderNum: order.orderNum,
              time: order.time,
              pickUp: order.pickUp,
              price: order.price,
              orderSelect: orderSelect.isSelected,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Wait;

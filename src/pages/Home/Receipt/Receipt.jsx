import React, { useState } from "react";
import loading from "../../../assets/icons/loading.svg";
import "./Receipt.css";

const Receipt = () => {
  const [Status, setStatus] = useState("null");

  const onClickHandler = (e) => {
    setStatus((e) => setStatus(e.target.name));
  };
  // const orderInfo = {
  //   orders: [
  //     {
  //       id: 123, //db 인덱스
  //       orderNum: 2, // 그날의 그가게의 주문번호
  //       pickUp: "픽업",
  //       foodies: [
  //         {
  //           name: "아메리카노",
  //           count: 3,
  //           options: ["샷 추가", "휘핑", "ICE", "그란데"],
  //         },
  //       ],
  //       phone: "010-6439-3547", // 고객의 전화번호
  //       time: "21/11/08 11:44:30", // 주문시간
  //       payment: "현대카드",
  //       price: 8500,
  //     },
  //   ],
  // };

  return (
    <div className="Box">
      <div className="rounded-rectangle">
        {Status === "pending" ? (
          // <PendingReceipt
          //   orderProps={{
          //     orderNum: orderInfo.orders.orderNum,
          //     time: orderInfo.orders.time,
          //     phone: orderInfo.orders.phone,
          //     foodies: orderInfo.orders.foodies,
          //     payment: orderInfo.orders.payment,
          //     price: orderInfo.orders.price,
          //   }}
          // />
          <div>pending</div>
        ) : Status === "progress" ? (
          // <Progress />
          <div onClick={onClickHandler}>progress</div>
        ) : Status === "complete" ? (
          // <Complete />
          <div>complete</div>
        ) : (
          <div className="nullReceipt">
            <img alt="loading" src={loading} />
            <span className="receipt-text">주문을 선택해주세요</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Receipt;

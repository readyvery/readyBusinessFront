import React from "react";
import { useRecoilState } from "recoil";
import { selectOrder, selectStatus } from "../../../Atom/order";
import loading from "../../../assets/icons/loading.svg";
import "./Receipt.css";

import CompleteReceipt from "./StatusReceipt/CompleteReceipt";
import PendingReceipt from "./StatusReceipt/PendingReceipt";
import ProgressReceipt from "./StatusReceipt/ProgressReceipt";

const Receipt = () => {
  const Status = useRecoilState(selectStatus);
  const Order = useRecoilState(selectOrder);

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
    ],
  };

  return (
    <div className="Box">
      <div className="rounded-rectangle">
        {Status === "pending" ? (
          <PendingReceipt orderProps={Order} />
        ) : Status === "progress" ? (
          <ProgressReceipt
            orderProps={{
              orderNum: orderInfo.orders[0].orderNum,
              time: orderInfo.orders[0].time,
              phone: orderInfo.orders[0].phone,
              foodies: orderInfo.orders[0].foodies,
              payment: orderInfo.orders[0].payment,
              price: orderInfo.orders[0].price,
            }}
          />
        ) : // <div onClick={onClickHandler}>progress</div>
        Status === "complete" ? (
          <CompleteReceipt
            orderProps={{
              orderNum: orderInfo.orders[0].orderNum,
              time: orderInfo.orders[0].time,
              phone: orderInfo.orders[0].phone,
              foodies: orderInfo.orders[0].foodies,
              payment: orderInfo.orders[0].payment,
              price: orderInfo.orders[0].price,
            }}
          />
        ) : (
          // <div>complete</div>
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

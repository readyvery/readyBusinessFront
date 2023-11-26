import React from "react";
import { useRecoilValue } from "recoil";
import { selectOrder, selectStatus } from "../../../Atom/order";
import loading from "../../../assets/icons/loading.svg";
import "./Receipt.css";

import CompleteReceipt from "./StatusReceipt/CompleteReceipt";
import PendingReceipt from "./StatusReceipt/PendingReceipt";
import ProgressReceipt from "./StatusReceipt/ProgressReceipt";

const Receipt = () => {
  const Status = useRecoilValue(selectStatus);
  const Order = useRecoilValue(selectOrder);

  const onClickHandler = () => {
    console.log(Status);
    console.log(Order);
  };

  return (
    <div className="Box">
      <div className="rounded-rectangle">
        {Status === "pending" ? (
          <PendingReceipt orderProps={Order} />
        ) : Status === "progress" ? (
          <ProgressReceipt orderProps={Order} />
        ) : Status === "complete" ? (
          <CompleteReceipt orderProps={Order} />
        ) : (
          <div className="nullReceipt">
            <img onClick={onClickHandler} alt="loading" src={loading} />
            <span className="receipt-text">주문을 선택해주세요</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Receipt;

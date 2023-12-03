import React from "react";
import { useRecoilState } from "recoil";
import { selectOrder, selectStatus } from "../../../Atom/order";
import "./Receipt.css";

import CompleteReceipt from "./StatusReceipt/CompleteReceipt";
import PendingReceipt from "./StatusReceipt/PendingReceipt";
import PickUpAfterReceipt from "./StatusReceipt/PickUpAfterReceipt";
import ProgressReceipt from "./StatusReceipt/ProgressReceipt";

const Receipt = ({ fetchData }) => {
  const [Status, setStatus] = useRecoilState(selectStatus);
  const [Order, setOrder] = useRecoilState(selectOrder);

  return (
    <div className="Box">
      <div className="rounded-rectangle">
        {Status === "pending" ? (
          <PendingReceipt
            orderProps={Order}
            setStatus={setStatus}
            setOrder={setOrder}
            fetchData={fetchData}
          />
        ) : Status === "progress" ? (
          <ProgressReceipt
            orderProps={Order}
            setStatus={setStatus}
            setOrder={setOrder}
            fetchData={fetchData}
          />
        ) : Status === "complete" ? (
          <CompleteReceipt
            orderProps={Order}
            setStatus={setStatus}
            setOrder={setOrder}
            fetchData={fetchData}
          />
        ) : Status === "pickUp" ? (
          <PickUpAfterReceipt orderProps={Order} />
        ) : (
          <div alt="nullReceipt" />
        )}
      </div>
    </div>
  );
};

export default Receipt;

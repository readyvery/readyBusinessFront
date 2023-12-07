import { message } from "antd";
import axios from "axios";
import React from "react";

const ProgressReceipt = ({ orderProps, setStatus, setOrder, fetchData }) => {
  const apiUrl = process.env.REACT_APP_API_ROOT;
  // const setOrderSelect = useSetRecoilState(selectOrder);
  // const { orderNum, time, phone, foodies, payment, price } = orderProps;

  const handleComplete = async () => {
    const config = {
      withCredentials: true,
    };

    const body = {
      orderId: orderProps.orderId,
      status: "COMPLETE",
    };
    try {
      const res = await axios.post(
        `${apiUrl}/api/v1/order/complete`,
        body,
        config
      );
      console.log(res);
      if (res.data.success === true) {
        message.success("제조완료 처리되었습니다.");

        // fetchData가 완료될 때까지 기다립니다.
        await fetchData();

        // fetchData가 완료된 후에 실행됩니다.
        setStatus("null");
        setOrder(null);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="receiptHeader">
        <span className="receipt-header"> 주문번호 {orderProps?.orderNum}</span>

        <button onClick={handleComplete} className="receipt-btn">
          제조완료
        </button>
      </div>
      <div className="receiptTextBox">
        <span className="receipt-text">주문시간</span>
        <span className="receipt-text">
          {orderProps?.time?.split("T")[0].replaceAll("-", "/")}{" "}
          {orderProps?.time?.split("T")[1].split(".")[0]}
        </span>
      </div>
      <div className="receiptTextBox">
        <span className="receipt-text">고객연락처</span>
        <span className="receipt-text">
          {orderProps?.phone?.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")}
        </span>
      </div>
      <div className="receipt-divider" />
      <div className="receiptTextBox">
        <span className="receipt-text">주문내역</span>
      </div>
      {orderProps?.foodies?.map((e, i) => (
        <React.Fragment key={i}>
          <div className="receiptTextBox">
            <span className="receipt-FoodName">{e?.name}</span>
            <span className="receipt-FoodName count">{e?.count}</span>
          </div>
          <div className="receiptOption">
            {e.options.map((option) => (
              <span
                className="receipt-optiontext"
                style={{
                  color: option?.price !== 0 ? "#D82356" : undefined,
                  fontWeight: "500",
                }}
              >
                └ ({option?.category}) {option?.name}
              </span>
            ))}
          </div>
        </React.Fragment>
      ))}
      <div className="receipt-divider" />
      <div className="receiptTextBox">
        <span className="receipt-text">상품금액</span>
        <span className="receipt-text">{orderProps?.couponUsed ? orderProps?.price && (orderProps?.price + 500).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : orderProps?.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</span>
      </div>
      <div className="receiptTextBox">
        <span className="receipt-text">할인금액</span>
        <span className="receipt-text">{orderProps?.couponUsed ? "(-) 500원" : "0원"}</span>
      </div>
      <div className="receiptTextBox">
        <span className="receipt-text">결제금액</span>
        <span className="receipt-text">
          {orderProps?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
        </span>
      </div>
    </div>
  );
};

export default ProgressReceipt;

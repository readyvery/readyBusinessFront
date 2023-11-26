import axios from "axios";
import React from "react";

const ProgressReceipt = ({ orderProps }) => {
  const apiUrl = process.env.REACT_APP_API_ROOT;
  // const { orderNum, time, phone, foodies, payment, price } = orderProps;

  const handleComplete = () => {
    const config = {
      withCredentials: true
    };

    const body = {
      "orderId": orderProps.orderId,
      "status": "COMPLETE",
    };
    console.log(body);
    
    axios.post(`${apiUrl}/api/v1/order/complete`, body, config)
      .then((res) => {
        console.log(res);
        if(res.data.success === true){
          alert("제조완료 처리되었습니다.");
          // 데이터 다시 fetch
          // select된 데이터 변경
        }
      })
      .catch((err) => console.log(err))
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
        <span className="receipt-text">{orderProps?.time.split("T")[0].replaceAll("-", "/")} {orderProps?.time.split("T")[1].split(".")[0]}</span>
      </div>
      <div className="receiptTextBox">
        <span className="receipt-text">고객연락처</span>
        <span className="receipt-text">{orderProps?.phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')}</span>
      </div>
      <div className="receipt-divider" />
      <div className="receiptTextBox">
        <span className="receipt-text">주문내역</span>
      </div>
      {orderProps?.foodies?.map((e, i) => (
        <React.Fragment key={i}>
          <div className="receiptTextBox">
            <span className="receipt-FoodName">{e.name}</span>
            <span className="receipt-text">{e.count}</span>
          </div>
          <div className="receiptOption">
            {e.options.map((option) => (
              <span className="receipt-text">└ {option}</span>
            ))}
          </div>
        </React.Fragment>
      ))}
      <div className="receipt-divider" />
      <div className="receiptTextBox">
        <span className="receipt-text">결제수단</span>
        <span className="receipt-text">{orderProps?.payment}</span>
      </div>
      <div className="receiptTextBox">
        <span className="receipt-text">결제금액</span>
        <span className="receipt-text">{orderProps?.price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원</span>
      </div>
    </div>
  );
};

export default ProgressReceipt;

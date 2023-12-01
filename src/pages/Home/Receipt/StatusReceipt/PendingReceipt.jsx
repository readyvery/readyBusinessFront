import { message } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import X from "../../../../assets/icons/X.svg";

const PendingReceipt = ({ orderProps, setStatus, setOrder, fetchData }) => {
  const apiUrl = process.env.REACT_APP_API_ROOT;
  // const setOrderSelect = useSetRecoilState(selectOrder);

  const [ReceiveModal, setReceiveModal] = useState(false);
  const [RefuseModal, setRefuseModal] = useState(false);

  const handleReceiveModal = () => {
    setReceiveModal((prev) => !prev);
  };

  const cancelOrder = (e) => {
    const config = {
      withCredentials: true,
    };

    const body = {
      orderId: orderProps.orderId,
      status: "CANCEL",
      rejectReason: e.target.innerText,
    };
    console.log(body);

    axios
      .post(`${apiUrl}/api/v1/order/cancel`, body, config)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          message.info("취소되었습니다.");
          setRefuseModal((prev) => !prev);
          // 데이터 다시 fetch
          fetchData();
          // select된 데이터 변경
          setStatus("null");
          setOrder(null);
        }
      })
      .catch((err) => {
        console.log(err);
        setRefuseModal((prev) => !prev);
        // 데이터 다시 fetch
        fetchData();
        // select된 데이터 변경
        setStatus("null");
        setOrder(null);
      });
  };

  const handleMake = (e) => {
    const config = {
      withCredentials: true,
    };

    const body = {
      orderId: orderProps.orderId,
      status: "MAKE",
      time: parseInt(e.target.innerText.split("분")[0]),
    };
    console.log(body);

    axios
      .post(`${apiUrl}/api/v1/order/complete`, body, config)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          alert("접수되었습니다.");
          setReceiveModal((prev) => !prev);
          // 데이터 다시 fetch
          fetchData();
          // select된 데이터 변경
          // 클릭 시 스타일 변화
          setStatus("null");
          setOrder(null);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="receiptHeader">
        <span className="receipt-header"> 주문번호 {orderProps?.orderNum}</span>
      </div>
      <Row className="receiptButton">
        <Col className="receiptCol">
          <div className="receipt-btn__wrapper">
            <Button
              name="Reject"
              onClick={() => setRefuseModal((prev) => !prev)}
              style={{
                width: "7.75rem",
                height: "2.8125rem",
                border: "2px solid #DADADA",
                borderRadius: "1.5625rem",
                bordercolor: "#DADADA",
                backgroundColor: "#F5F5F5",
                fontFamily: "SemiBold",
                fontSize: "1.375rem",
                color: "#838383",
                justifyContent: "center",
              }}
            >
              거부
            </Button>
          </div>
        </Col>
        <Col className="receiptCol">
          <div className="receipt-btn__wrapper">
            <Button
              name="Accept"
              onClick={handleReceiveModal}
              style={{
                width: "7.75rem",
                height: "2.8125rem",
                border: "2px solid #D82356",
                borderRadius: "1.5625rem",
                backgroundColor: "#D82356",
                fontFamily: "SemiBold",
                fontSize: "1.375rem",
                color: "#FFFFFF",
              }}
            >
              접수
            </Button>
          </div>
        </Col>
      </Row>
      <div className="receiptTextBox">
        <span className="receipt-text">주문시간</span>
        <span className="receipt-text">
          {orderProps?.time.split("T")[0].replaceAll("-", "/")}{" "}
          {orderProps?.time.split("T")[1].split(".")[0]}
        </span>
      </div>
      <div className="receiptTextBox">
        <span className="receipt-text">고객연락처</span>
        <span className="receipt-text">
          {orderProps?.phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")}
        </span>
      </div>
      <div className="receipt-divider" />
      <div className="receiptTextBox">
        <span className="receipt-text">주문내역</span>
      </div>
      {orderProps?.foodies?.map((e, i) => (
        <React.Fragment key={i}>
          <div className="receiptTextBox">
            <span className="receipt-FoodName">• {e.name}</span>
            <span className="receipt-FoodName">{e.count}</span>
          </div>
          <div className="receiptOption">
            {e.options.map((option) => (
              <span className="receipt-optiontext">└ {option}</span>
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
        <span className="receipt-text">
          {orderProps?.price
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          원
        </span>
      </div>

      {/* 주문거부모달창 */}
      {!ReceiveModal && RefuseModal && (
        <div className="modal-wrapper">
          <div className="modal-box">
            <div
              className="modal-close__wrapper"
              onClick={() => setRefuseModal((prev) => !prev)}
            >
              <img src={X} alt="close" />
            </div>
            <div className="modal-box-txt__wrapper">
              <div className="modal-box-txt">접수 거부 사유를 선택해주세요</div>
            </div>
            <div className="modal-box-choose-btn__wrapper">
              <div
                className="modal-box-choose-btn"
                onClick={(e) => cancelOrder(e)}
              >
                재료소진
              </div>
              <div
                className="modal-box-choose-btn"
                onClick={(e) => cancelOrder(e)}
              >
                가게사정
              </div>
              <div
                className="modal-box-choose-btn"
                onClick={(e) => cancelOrder(e)}
              >
                기타
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 주문수락모달창 */}
      {!RefuseModal && ReceiveModal && (
        <div className="modal-wrapper">
          <div className="modal-box">
            <div className="modal-close__wrapper" onClick={handleReceiveModal}>
              <img src={X} alt="close" />
            </div>
            <div className="modal-box-txt__wrapper">
              <div className="modal-box-txt">제조 시간을 선택해주세요</div>
            </div>
            <div className="modal-box-choose-btn__wrapper">
              <div className="modal-box-choose-btn__row">
                <Col className="modal-box-choose-btn__col">
                  <div
                    className="modal-box-chooseTime-btn"
                    onClick={handleMake}
                  >
                    5분
                  </div>
                </Col>
                <Col className="modal-box-choose-btn__col">
                  <div
                    className="modal-box-chooseTime-btn"
                    onClick={handleMake}
                  >
                    10분
                  </div>
                </Col>
              </div>
              <div className="modal-box-choose-btn__row">
                <Col className="modal-box-choose-btn__col">
                  <div
                    className="modal-box-chooseTime-btn"
                    onClick={handleMake}
                  >
                    15분
                  </div>
                </Col>
                <Col className="modal-box-choose-btn__col">
                  <div
                    className="modal-box-chooseTime-btn"
                    onClick={handleMake}
                  >
                    20분
                  </div>
                </Col>
              </div>
              <div className="modal-box-choose-btn__row">
                <Col className="modal-box-choose-btn__col">
                  <div
                    className="modal-box-chooseTime-btn"
                    onClick={handleMake}
                  >
                    25분
                  </div>
                </Col>
                <Col className="modal-box-choose-btn__col">
                  <div
                    className="modal-box-chooseTime-btn"
                    onClick={handleMake}
                  >
                    30분
                  </div>
                </Col>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingReceipt;

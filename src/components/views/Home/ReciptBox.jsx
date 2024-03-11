import React, { useContext, useMemo } from "react";
import cherry from "../../../assets/icons/cherry.svg";
import useAcceptOrder from "../../../hooks/useAcceptOrder";
import useCancelOrder from "../../../hooks/useCancelOrder";
import { HomeContext } from "../../../pages/OrderManage/Home";
import "../../../pages/OrderManage/Receipt.css";
import ReceiptTest from "../../../pages/ReceiptTest";
import ReciptModal from "./ReciptModal";

export default function ReceiptBox ({children, modalIdx, setModalIdx}) {
    const context = useContext(HomeContext);

    const refuseList = useMemo(() => ([
      "재료 소진", 
      "가게 사정", 
      "기타"
    ]), []);

    const receiveList = useMemo(() => ([
      0, 
      5, 
      10, 
      15, 
      20, 
      25, 
      30
    ]), []);

    const cancelOrder = useCancelOrder();
    const acceptOrder = useAcceptOrder();
  
    const handleCancel = async(e) => {
      setModalIdx(0);
      console.log(e);
      try{
        await cancelOrder(
          context?.selectedMenu[0]?.orderId, 
          e
        )
      } catch (error){
        console.error(error);
      }
    };
  
    const handleMake = async (e) => {
      setModalIdx(0);
      console.log(context?.selectedMenu);
      try{
        await acceptOrder(
          context?.selectedMenu[0]?.orderId, 
          e
        )
      } catch (error){
        console.error(error);
      }
    };

    const selectedInfo = context.selectedMenu;
    console.log(selectedInfo);

    return(
      <div className="receiptWrapper">
        {/* <img
            src={close}
            className="BackIcon"
            alt="BackIcon"
            onClick={() => setModalIdx(0)}
          /> */}
        {
          selectedInfo?.length ? (
            <>
              <div className="receiptHeader">
                <span className="receipt-header"> 주문번호 {selectedInfo[0]?.orderNum}</span>
                {children}
            </div>
            <div className="receiptTextBox">
                <span className="receipt-text">주문시간</span>
                <span className="receipt-text">
                    {selectedInfo[0]?.time?.split("T")[0].replaceAll("-", "/")}
                    {" "}
                    {selectedInfo[0]?.time?.split("T")[1]?.split(".")[0]}
                </span>
            </div>
            <div className="receiptTextBox">
                <span className="receipt-text">고객연락처</span>
                <span className="receipt-text">
                    {selectedInfo[0]?.phone}
                </span>
            </div>
            <div className="receiptTextBox">
                <span className="receipt-text">수령방식</span>
                <span className="receipt-text">
                    {selectedInfo[0]?.pickUp === 1 ? "픽업" : "매장"}
                </span>
            </div>
            <div className="receipt-divider" />
            <div className="receiptTextBox">
              <span className="receipt-text">주문내역</span>
            </div>
            {selectedInfo[0]?.foodies?.map((food, i) => (
              <React.Fragment key={i}>
                <div className="receiptTextBox">
                  <span className="receipt-FoodName">• {food?.name}</span>
                  <span className="receipt-FoodName count">{food?.count}</span>
                </div>
                <div className="receiptOption">
                  {food?.options?.map((option) => (
                    <span
                      className="receipt-optiontext"
                      style={{
                        color: (option?.price !== 0 || option?.category === "HOT/ICE"
                        || option?.category === "ICE/HOT") ? "#D82356" : undefined,
                        fontWeight: "500",
                      }}
                    >
                      └ ({option.category}) {option.name}
                    </span>
                  ))}
                </div>
              </React.Fragment>
            ))}
            <div className="receipt-divider" />
            <div className="receiptTextBox">
              <span className="receipt-text">상품금액</span>
              <span className="receipt-text">
                {selectedInfo[0]?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
              </span>
            </div>
            <div className="receiptTextBox">
              <span className="receipt-text">할인금액</span>
              <span className="receipt-text">
                {selectedInfo[0]?.couponUsed ? "(-) 500원" : "0원"}
              </span>
            </div>
            <div className="receiptTextBox">
              <span className="receipt-text bold">총 결제금액</span>
              <span className="receipt-text bold red">
                {selectedInfo[0]?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
              </span>
            </div>

            {
              context?.selectedMenu &&
              context?.selectedMenu.length > 0 &&
              context?.selectedMenu[0]?.progress &&
              context?.selectedMenu[0]?.progress === "MAKE" && 
              <ReceiptTest color="white"/>
            }

            {/* 주문거부모달창 */}
            {modalIdx === 1 && (
              <ReciptModal 
                closeModal={() => setModalIdx(0)}
                title="접수 거부 사유를 선택해주세요"
              >
                <div className="modal-box-choose-btn__wrapper">
                  {refuseList.map((text, idx) => (
                    <React.Fragment key={idx}>
                      <div
                        className="modal-box-choose-btn"
                        onClick={() => handleCancel(text)}
                      >
                        {text}
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </ReciptModal>
            )}

            {/* 주문수락모달창 */}
            {modalIdx === 2 && (
              <ReciptModal 
                closeModal={() => setModalIdx(0)}
                title="제조 시간을 선택해주세요"
              >
                <div className="modal-box-choose-btn__wrapper">
                  <div className="modal-box-chooseTime-wrapper">
                  {receiveList.map((text, idx) => {
                    if(!idx){
                    return (
                      <React.Fragment key={idx}>
                        <div className="modal-box-choose-btn__row">
                          <div
                            className="modal-box-chooseTime-btn column"
                            onClick={() => handleMake(text)}
                          >
                            즉시
                          </div>
                        </div>
                      </React.Fragment>
                    );} else {
                      return (
                        <React.Fragment key={idx}>
                          <div
                            className="modal-box-chooseTime-btn-between row"
                            onClick={() => handleMake(text)}
                          >
                            {text}분
                          </div>
                        </React.Fragment>
                      )
                    }
                  })}
                </div>
                </div>
              </ReciptModal>
            )}
            </>
          ) : (
            <div className="noMenuImgWrapper">
              <img src={cherry} alt="berry" className="noMenuImg"/>
            </div>
          )
        }
      </div>
    );
}
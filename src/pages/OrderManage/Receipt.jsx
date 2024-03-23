import { message } from "antd";
import AOS from "aos";
import "aos/dist/aos.css";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import ReceiptBox from "../../components/views/Home/ReciptBox";
import useCompleteOrder from "../../hooks/useCompleteOrder";
import theme from "../../style/theme/theme";
import ReceiptTest from "../ReceiptTest";
import { HomeContext } from "./Home";
import "./Receipt.css";

const Receipt = () => {

  const context = useContext(HomeContext);

  const [modalIdx, setModalIdx] = useState(0);


  useEffect(() => {
    AOS.init();
  });
  
  const { completeOrder } = useCompleteOrder();

  // 제조 완료
  const handleMakeComplete = async () => {
    message.loading("로딩 중...");
    completeOrder(
      context?.selectedMenu[0]?.orderId, 
    );
    setModalIdx(0);
    context.setSelectedMenu({});
    context.setSelectedIdx(0);
  }

  return (
    <div
      data-aos="zoom-in"
      className={context.selectedIdx ? `Box` : `Box nonDisplay`}
    >
      <div className="rounded-rectangle">
        <ReceiptBox modalIdx={modalIdx} setModalIdx={setModalIdx}>
          {
            context?.selectedMenu && 
            context?.selectedMenu.length > 0 && 
            context?.selectedMenu[0]?.progress && 
            context.selectedMenu[0]?.progress === "ORDER" && 
          (
            <BtnWrapper>
              <RefuseBtn onClick={() => setModalIdx(1)}>거부</RefuseBtn>
              <AcceptBtn onClick={() => setModalIdx(2)}>접수</AcceptBtn>
            </BtnWrapper>
          )}
          {
            context?.selectedMenu && 
            context?.selectedMenu.length > 0 && 
            context?.selectedMenu[0]?.progress && 
            context?.selectedMenu[0]?.progress === "MAKE" && 
          (
            <BtnWrapper>
              <CompleteBtn onClick={handleMakeComplete}>제조완료</CompleteBtn>
            </BtnWrapper>
          )}
          {
            context?.selectedMenu && 
            context?.selectedMenu.length > 0 && 
            context?.selectedMenu[0]?.progress && 
            context?.selectedMenu[0]?.progress === "COMPLETE" && 
          (
            <BtnWrapper>
              <ReceiptTest></ReceiptTest>
            </BtnWrapper>
          )}
        </ReceiptBox>
      </div>
    </div>
  );
};

const BtnWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 60%;
  gap: 1rem;
  // height: 50px;
`;

const RefuseBtn = styled.div`
  text-align: center;
  color: ${theme.colors.text};
  border: 1.74px solid ${theme.colors.borderColor};
  font-size: 1.2rem;
  font-family: "Pretendard Variable";
  font-weight: 800;
  width: 45%;
  height: 3rem;
  line-height: 2.75rem;
  border-radius: 20px;
  cursor: pointer;
`;

const AcceptBtn = styled.div`
  text-align: center;
  color: #fff;
  background-color: ${theme.colors.MainColor};
  border: 1.74px solid ${theme.colors.MainColor};
  font-size: 1.2rem;
  font-family: "Pretendard Variable";
  font-weight: 800;
  width: 45%;
  height: 3rem;
  line-height: 2.75rem;
  border-radius: 20px;
  cursor: pointer;
`;

const CompleteBtn = styled.div`
  text-align: center;
  color: #fff;
  background-color: ${theme.colors.MainColor};
  border: 1.74px solid ${theme.colors.MainColor};
  font-size: 1.2rem;
  font-family: "Pretendard Variable";
  font-weight: 800;
  width: 80%;
  height: 3rem;
  line-height: 2.75rem;
  border-radius: 1.25rem;
  cursor: pointer;
`;

export default Receipt;

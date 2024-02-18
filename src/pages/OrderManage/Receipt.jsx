import AOS from "aos";
import "aos/dist/aos.css";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import ReceiptBox from "../../components/views/Home/ReciptBox";
import theme from "../../style/theme/theme";
import { HomeContext } from "./Home";
import "./Receipt.css";

const Receipt = () => {
  const orderProps = {
    status: 1,
  };
  const context = useContext(HomeContext);

  const [modalIdx, setModalIdx] = useState(0);

  useEffect(() => {
    AOS.init();
  })

  return (
    <div data-aos="zoom-in" className={context.selectedIdx ? `Box` : `Box nonDisplay`}>
      <div className="rounded-rectangle">
        <ReceiptBox modalIdx={modalIdx} setModalIdx={setModalIdx}>
          {orderProps.status === 1 ? (
            <BtnWrapper>
              <RefuseBtn onClick={() => setModalIdx(1)}>거부</RefuseBtn>
              <AcceptBtn onClick={() => setModalIdx(2)}>접수</AcceptBtn>
            </BtnWrapper>
          ) : (
            <BtnWrapper>
              <CompleteBtn>완료처리</CompleteBtn>
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
  gap: 1.5rem;
  // height: 50px;
`;

const RefuseBtn = styled.div`
  text-align: center;
  color: ${theme.colors.text};
  border: 1.74px solid ${theme.colors.borderColor};
  font-size: 1.2rem;
  font-family: "Pretendard";
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
  font-family: "Pretendard";
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
  font-family: "Pretendard";
  font-weight: 800;
  width: 100%;
  height: 3rem;
  line-height: 2.75rem;
  border-radius: 20px;
  cursor: pointer;
`;

export default Receipt;

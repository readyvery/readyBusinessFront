import React from "react";
import styled from "styled-components";
import ReceiptBox from "../../components/views/Home/ReciptBox";
import theme from "../../style/theme/theme";
import "./Receipt.css";

// import CompleteReceipt from "./Receipt/StatusReceipt/CompleteReceipt";
// import PendingReceipt from "./Receipt/StatusReceipt/PendingReceipt";
// import PickUpAfterReceipt from "./Receipt/StatusReceipt/PickUpAfterReceipt";
// import ProgressReceipt from "./Receipt/StatusReceipt/ProgressReceipt";

const Receipt = () => {
  const orderProps = {
    status: 1,
    time: "23/10/23T14:13:02",
    phone: "010-1234-1234",
    foodies: [
      {
        name: "(ICE) 아메리카노",
        count: 2,
        options: [
          {
            price: 0,
            category: "HOT/ICE",
            name: "기본 사이즈"
          },
          {
            price: 500,
            category: "샷옵션",
            name: "샷추가"
          }
        ]
      }
    ]
  };


  return (
    <div className="Box">
      <div className="rounded-rectangle">
        <ReceiptBox orderProps={orderProps}>
          {orderProps.status === 1 ? (
            <BtnWrapper>
              <RefuseBtn>거부</RefuseBtn>
              <AcceptBtn>접수</AcceptBtn>
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
  font-family: Bold;
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
  font-family: Bold;
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
  font-family: Bold;
  width: 100%;
  height: 3rem;
  line-height: 2.75rem;
  border-radius: 20px;
  cursor: pointer;
`;

export default Receipt;

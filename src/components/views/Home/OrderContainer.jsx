import React, { useContext } from "react";
import styled from "styled-components";
import useFetchCompleteInfo from "../../../hooks/useFetchCompleteInfo";
import useFetchMakeInfo from "../../../hooks/useFetchMakeInfo";
import useFetchWaitInfo from "../../../hooks/useFetchWaitInfo";
import { HomeContext } from "../../../pages/OrderManage/Home";
import theme from "../../../style/theme/theme";
import OrderBox from "./OrderBox";

export default function OrderContainer() {
  const context = useContext(HomeContext);

  const waitInfo = useFetchWaitInfo();
  const makeInfo = useFetchMakeInfo();
  const completeInfo = useFetchCompleteInfo();
  console.log(waitInfo);
  console.log(makeInfo);
  console.log(completeInfo);

  const handleOrderMenu = (dummyInfo, e) => {
    const selectedMenu = dummyInfo?.orders?.filter((order) => order.idx === e);
    context.setSelectedMenu(e !== context.selectedIdx ? selectedMenu : {});
    context.setSelectedIdx(e !== context.selectedIdx ? e : 0);
  };

  // const handleWaitOrderMenu = (e) => handleOrderMenu(waitDummyInfo, e); // 신규 주문
  // const handleMakeOrderMenu = (e) => handleOrderMenu(makeDummyInfo, e); // 진행 주문
  // const handleCompleteOrderMenu = (e) => handleOrderMenu(completeDummyInfo, e); // 완료 주문

  const handleWaitOrderMenu = (e) => handleOrderMenu(waitInfo, e); // 신규 주문
  const handleMakeOrderMenu = (e) => handleOrderMenu(makeInfo, e); // 진행 주문
  const handleCompleteOrderMenu = (e) => handleOrderMenu(completeInfo, e); // 완료 주문

  return (
    <Container>
      {context.status === 1 ? (
        <>
          <OrderBoxContainer>
            {/* <OrderTitleBox>신규 {waitDummyInfo?.orders?.length}건</OrderTitleBox> */}
            <OrderTitleBox>신규 {waitInfo?.orders?.length}건</OrderTitleBox>
            {
              // waitDummyInfo?.orders?.map((item) => (
              //     <span onClick={() => handleWaitOrderMenu(item.idx)}>
              //         <OrderBox
              //             id={item.idx}
              //             category={item.pickUp}
              //             menu={item.foodies}
              //             clicked={item.idx === context.selectedIdx}
              //         />
              //     </span>
              // ))
              waitInfo?.orders?.map((item) => (
                <span onClick={() => handleWaitOrderMenu(item.idx)}>
                  <OrderBox
                    id={item.idx}
                    category={item.pickUp === 1 ? "매장" : "픽업"}
                    menu={item.foodies}
                    clicked={item.idx === context.selectedIdx}
                  />
                </span>
              ))
            }
          </OrderBoxContainer>
          <OrderBoxContainer>
            {/* <OrderTitleBox>진행 {makeDummyInfo?.orders?.length}건</OrderTitleBox> */}
            <OrderTitleBox>진행 {makeInfo?.orders?.length}건</OrderTitleBox>
            {
              // makeDummyInfo?.orders?.map((item) => (
              //     <span onClick={() => handleMakeOrderMenu(item.idx)}>
              //         <OrderBox
              //             id={item.idx}
              //             category={item.pickUp}
              //             menu={item.foodies}
              //             clicked={item.idx === context.selectedIdx}
              //         />
              //     </span>
              // ))
              makeInfo?.orders?.map((item) => (
                <span onClick={() => handleMakeOrderMenu(item.idx)}>
                  <OrderBox
                    id={item.idx}
                    category={item.pickUp === 1 ? "매장" : "픽업"}
                    menu={item.foodies}
                    clicked={item.idx === context.selectedIdx}
                  />
                </span>
              ))
            }
          </OrderBoxContainer>
        </>
      ) : (
        <>
          {
            // completeDummyInfo?.orders?.map((item) => (
            //     <span onClick={() => handleCompleteOrderMenu(item.idx)}>
            //         <OrderBox
            //             id={item.idx}
            //             category={item.pickUp}
            //             menu={item.foodies}
            //             clicked={item.idx === context.selectedIdx}
            //         />
            //     </span>
            // ))
            completeInfo?.orders?.map((item) => (
              <span onClick={() => handleCompleteOrderMenu(item.idx)}>
                <OrderBox
                  id={item.idx}
                  category={item.pickUp === 1 ? "매장" : "픽업"}
                  menu={item.foodies}
                  clicked={item.idx === context.selectedIdx}
                />
              </span>
            ))
          }
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: calc(100% - 60px);
  overflow-y: auto;
`;

const OrderBoxContainer = styled.div`
  width: 100%;
  height: 50%;
`;

const OrderTitleBox = styled.div`
  width: 100%;
  height: 50px;
  line-height: 50px;
  background-color: ${theme.colors.boxColor};
  color: ${theme.colors.title};
  font-size: 1.2rem;
  font-family: "Pretendard Variable";
  font-weight: 800;
  text-align: center;
  // border-top: 0.5px solid ${theme.colors.text};
  border-bottom: 1px solid ${theme.colors.text};
`;

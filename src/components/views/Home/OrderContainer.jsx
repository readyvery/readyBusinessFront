import React, { useContext } from "react";
import styled from "styled-components";
import { useFetchCompleteInfo } from "../../../hooks/useFetchCompleteInfo";
import { useFetchIntegrationInfo } from "../../../hooks/useFetchIntegrationInfo";
import { HomeContext } from "../../../pages/OrderManage/Home";
import theme from "../../../style/theme/theme";
import OrderBox from "./OrderBox";

export default function OrderContainer () {
    const context = useContext(HomeContext);
    
    // const {data: waitData} = useFetchWaitInfo();
    // const {data: makeData} = useFetchMakeInfo();
    const {
        orders: waitData, 
        integrationMakeOrders: makeData
    } = 
        useFetchIntegrationInfo(); // 신규 + 진행
    const {
        orders: completeData
    } = useFetchCompleteInfo(); // 완료

    const handleOrderMenu = (dummyInfo, e) => {
        const selectedMenu = dummyInfo.filter((order) => order.idx === e);
        context.setSelectedMenu(e !== context.selectedIdx ? selectedMenu : {});
        context.setSelectedIdx(e !== context.selectedIdx ? e : 0);
    }
    
    const handleWaitOrderMenu = (e) => handleOrderMenu(waitData, e); // 신규 주문
    const handleMakeOrderMenu = (e) => handleOrderMenu(makeData, e); // 진행 주문
    const handleCompleteOrderMenu = (e) => handleOrderMenu(completeData, e); // 완료 주문
    
    return(
        <Container>
            {context.status === 1 ? (
                <>
                <OrderBoxContainer>
                    <OrderTitleBox>신규 {waitData?.length}건</OrderTitleBox>
                    <OrderBoxWrapper>
                        {
                            waitData && waitData?.map((item) => (
                                <span onClick={() => handleWaitOrderMenu(item.idx)}>
                                    <OrderBox 
                                        id={item.orderNum}
                                        category={item.pickUp}
                                        menu={item.foodies}
                                        clicked={item.idx === context.selectedIdx}
                                    />
                                </span>
                            ))
                        }
                    </OrderBoxWrapper>
                </OrderBoxContainer>
                <OrderBoxContainer>
                    <OrderTitleBox>진행 {makeData?.length}건</OrderTitleBox>
                    <OrderBoxWrapper>
                    {
                        makeData && makeData?.map((item) => (
                            <span onClick={() => handleMakeOrderMenu(item.idx)}>
                                <OrderBox 
                                    id={item.orderNum}
                                    category={item.pickUp}
                                    menu={item.foodies}
                                    clicked={item.idx=== context.selectedIdx}
                                />
                            </span>
                        ))
                    }
                    </OrderBoxWrapper>
                </OrderBoxContainer>
                </>
            ) : (
                <>
                    {
                        completeData && completeData?.map((item) => (
                            <span onClick={() => handleCompleteOrderMenu(item.idx)}>
                                <OrderBox 
                                    id={item.orderNum}
                                    category={item.pickUp}
                                    menu={item.foodies}
                                    clicked={item.idx === context.selectedIdx}
                                />
                            </span>
                        ))
                    }
                </>
            )}
        </Container>
    )
}

const Container = styled.div`
  width: 100%;
  height: calc(100% - 60px);
  overflow-y: auto;

//   -ms-overflow-style: none; /* 인터넷 익스플로러 */
//     scrollbar-width: none; /* 파이어폭스 */

//     &::-webkit-scrollbar {
//         display: none;
//     }
`;

const OrderBoxContainer = styled.div`
    width: 100%;
    height: 50%;
    overflow-y: hidden;
`;

const OrderTitleBox = styled.div`
    width: 100%;
    height: 50px;
    line-height: 50px;
    background-color: ${theme.colors.boxColor};
    color: ${theme.colors.title};
    font-size: 1.2rem;
    font-family: "Pretendard";
    font-weight: 800;
    text-align: center;
    // border-top: 0.5px solid ${theme.colors.text};
    border-bottom: 1px solid ${theme.colors.text};
`;

const OrderBoxWrapper = styled.div`
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding-bottom: 50px;

    // -ms-overflow-style: none; /* 인터넷 익스플로러 */
    // scrollbar-width: none; /* 파이어폭스 */

    // &::-webkit-scrollbar {
    //     display: none;
    // }
`;
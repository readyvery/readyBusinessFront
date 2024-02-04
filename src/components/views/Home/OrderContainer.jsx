import React, { useContext } from "react";
import styled from "styled-components";
// import useFetchWaitInfo from "../../../hooks/useFetchWaitInfo";
import { HomeContext } from "../../../pages/OrderManage/Home";
import theme from "../../../style/theme/theme";
import OrderBox from "./OrderBox";

export default function OrderContainer () {
    const context = useContext(HomeContext);
    
    // const waitInfo = useFetchWaitInfo();
    // console.log(waitInfo);

    const waitDummyInfo =
        {
            "orders":[
                {
                   "idx":69,
                   "orderNum":"6",
                   "orderId":"ee399810-48e1-4c7a-9744-be894bde5147",
                   "pickUp": "픽업",
                   "foodies":[
                      {
                         "name":"카페라떼(HOT/ICE)",
                         "count":1,
                         "options":[
                            {
                               "name":"ICE",
                               "category":"HOT/ICE",
                               "price": 0
                            },
                            {
                               "name":"기본",
                               "category":"사이즈",
                               "price": 0
                            },
                            {
                               "name":"기본",
                               "category":"원두선택",
                               "price": 0
                            },
                            {
                               "name":"기본(2샷)",
                               "category":"샷 옵션",
                               "price": 0
                            },
                            {
                               "name":"헤이즐넛시럽",
                               "category":"시럽추가",
                               "price": 500
                            },
                            {
                               "name":"바닐라시럽",
                               "category":"시럽추가",
                               "price": 500
                            }
                         ]
                      }
                   ],
                   "phone":"3170764862",
                   "time":"2023-12-03T21:12:16.137224",
                   "method":"간편결제",
                   "price":3800
                }
             ]
        }
    ;

    const makeDummyInfo = {
        "orders" : [
			{
					"idx" : 123, //db 인덱스
					"orderNum" : 2, // 그날의 그가게의 주문번호
					"countDown" : 45, // 초 단위
					"pickUp" : "픽업",
					"foodies" : [
						{
								"name" : "아메리카노",
								"count" : 3,
								"options":[
                                    
                                 ],
						},
                        {
                            "name" : "아메리카노",
                            "count" : 3,
                            "options":[
                                {
                                   "name":"ICE",
                                   "category":"HOT/ICE",
                                   "price": 0
                                },
                                {
                                   "name":"바닐라시럽",
                                   "category":"시럽추가",
                                   "price": 500
                                }
                             ],
                        },
					],
					"phone" : "010-6439-3547", // 고객의 전화번호
					"time" : "2021-11-08T11:44:30.327959", // 주문시간
					"payment" : "현대카드",
					"price" : 8500,
			},
			{
					"idx" : 133, //db 인덱스
					"orderNum" : 33, // 그날의 그가게의 주문번호
					"countDown" : 45, // 초 단위
					"pickUp" : "픽업",
					"foodies" : [
						{
								"name" : "아메리카누",
								"count" : 3,
								"options":[
                                    {
                                       "name":"ICE",
                                       "category":"HOT/ICE",
                                       "price": 0
                                    },
                                    {
                                       "name":"기본",
                                       "category":"사이즈",
                                       "price": 0
                                    },
                                    {
                                       "name":"기본",
                                       "category":"원두선택",
                                       "price": 0
                                    },
                                    {
                                       "name":"기본(2샷)",
                                       "category":"샷 옵션",
                                       "price": 0
                                    },
                                    {
                                       "name":"헤이즐넛시럽",
                                       "category":"시럽추가",
                                       "price": 500
                                    },
                                 ],
						},
					],
					"phone" : "010-7679-3547", // 고객의 전화번호
					"time" : "2023-11-08T11:44:30.327959", // 주문시간
					"payment" : "현대카드",
					"price" : 78500,
			},
	],
    };

    const completeDummyInfo = {
        "orders" : [
			{
					"idx" : 123, //db 인덱스
					"orderNum" : 2, // 그날의 그가게의 주문번호
					"pickUp" : "픽업",
					"foodies" : [
						{
								"name" : "아메리카노",
								"count" : 3,
								"options":[
                                    {
                                       "name":"ICE",
                                       "category":"HOT/ICE",
                                       "price": 0
                                    },
                                 ],
						},
					],
					"phone" : "010-6439-3547", // 고객의 전화번호
					"time" : "2021-11-08T11:44:30.327959", // 주문시간
					"payment" : "현대카드",
					"price" : 8500,
			},
			{
					"idx" : 133, //db 인덱스
					"orderNum" : 33, // 그날의 그가게의 주문번호
					"pickUp" : "매장",
					"foodies" : [
						{
								"name" : "아메리카누",
								"count" : 3,
								"options":[
                                    {
                                       "name":"ICE",
                                       "category":"HOT/ICE",
                                       "price": 0
                                    },
                                    {
                                       "name":"기본",
                                       "category":"사이즈",
                                       "price": 0
                                    },
                                    {
                                       "name":"기본",
                                       "category":"원두선택",
                                       "price": 0
                                    },
                                 ],
						},
					],
					"phone" : "010-7679-3547", // 고객의 전화번호
					"time" : "2023-11-08T11:44:30.327959", // 주문시간
					"payment" : "현대카드",
					"price" : 78500,
			},
	],
    }


    const handleOrderMenu = (dummyInfo, e) => {
        const selectedMenu = dummyInfo.orders.filter((order) => order.idx === e);
        context.setSelectedMenu(e !== context.selectedIdx ? selectedMenu : {});
        context.setSelectedIdx(e !== context.selectedIdx ? e : 0);
    }
    
    const handleWaitOrderMenu = (e) => handleOrderMenu(waitDummyInfo, e); // 신규 주문
    const handleMakeOrderMenu = (e) => handleOrderMenu(makeDummyInfo, e); // 진행 주문
    const handleCompleteOrderMenu = (e) => handleOrderMenu(completeDummyInfo, e); // 완료 주문

    
    return(
        <Container>
            {context.status === 1 ? (
                <>
                <OrderTitleBox>신규 {waitDummyInfo.orders.length}건</OrderTitleBox>
                {
                    waitDummyInfo.orders.map((item) => (
                        <span onClick={() => handleWaitOrderMenu(item.idx)}>
                            <OrderBox 
                                id={item.idx}
                                category={item.pickUp}
                                menu={item.foodies}
                                clicked={item.idx === context.selectedIdx}
                            />
                        </span>
                    ))
                }
                
                <OrderTitleBox>진행 {makeDummyInfo.orders.length}건</OrderTitleBox>
                {
                    makeDummyInfo.orders.map((item) => (
                        <span onClick={() => handleMakeOrderMenu(item.idx)}>
                            <OrderBox 
                                id={item.idx}
                                category={item.pickUp}
                                menu={item.foodies}
                                clicked={item.idx === context.selectedIdx}
                            />
                        </span>
                    ))
                }
                </>
            ) : (
                <>
                    {
                        completeDummyInfo.orders.map((item) => (
                            <span onClick={() => handleCompleteOrderMenu(item.idx)}>
                                <OrderBox 
                                    id={item.idx}
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
    // height: 100%;
    overflow-y: auto;
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
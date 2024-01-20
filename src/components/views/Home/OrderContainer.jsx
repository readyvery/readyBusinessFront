import React, { useContext } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { selectId } from "../../../Atom/order";
import useFetchWaitInfo from "../../../hooks/useFetchWaitInfo";
import { HomeContext } from "../../../pages/Home/Home";
import theme from "../../../style/theme/theme";
import OrderBox from "./OrderBox";

export default function OrderContainer ({ status }) {
    const context = useContext(HomeContext);
    const [orderId, setOrderId] = useRecoilState(selectId);

    // useEffect(() => {
    //     useFetchWaitInfo();
    // }, [context.status]);
    const waitInfo = useFetchWaitInfo();
    console.log(waitInfo);
    const dummy =
        {
            new: [
                {
                    id: 123,
                    category: "매장", 
                    menu: "아메리카노"
                }, 
                {
                    id: 124,
                    category: "매장", 
                    menu: "카페라떼 외 1건"
                }
            ],
            progress: [
                {
                    id: 125,
                    category: "픽업", 
                    menu: "바닐라라떼 외 1건"
                }, 
                {
                    id: 126,
                    category: "픽업", 
                    menu: "카페라떼 외 1건"
                }
            ]
        }
    ;

    const handleOrderId = (e) => {
        if(e !== context.selectedIdx){
            context.setSelectedIdx(e);
        } else {
            context.setSelectedIdx(0);
        }

    }

    return(
        <Container>
            {context.status === 1 ? (
                <>
                <OrderTitleBox>신규 2건</OrderTitleBox>
                {
                    dummy.new.map((item) => (
                        <span onClick={() => handleOrderId(item.id)}>
                            <OrderBox 
                                id={item.id}
                                category={item.category}
                                menu={item.menu}
                                clicked={item.id === context.selectedIdx}
                            />
                        </span>
                    ))
                }
                
                <OrderTitleBox>진행 2건</OrderTitleBox>
                {
                    dummy.progress.map((item) => (
                        <span onClick={() => handleOrderId(item.id)}>
                            <OrderBox 
                                id={item.id}
                                category={item.category}
                                menu={item.menu}
                                clicked={item.id === context.selectedIdx}
                            />
                        </span>
                    ))
                }
                </>
            ) : (
                <>
                    {
                        dummy.progress.map((item) => (
                            <span onClick={() => handleOrderId(item.id)}>
                                <OrderBox 
                                    id={item.id}
                                    category={item.category}
                                    menu={item.menu}
                                    clicked={item.id === context.selectedIdx}
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
    font-family: Bold;
    // border-top: 0.5px solid ${theme.colors.text};
    border-bottom: 1px solid ${theme.colors.text};
`;
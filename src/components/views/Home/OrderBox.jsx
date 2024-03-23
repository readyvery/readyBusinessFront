import styled, { css } from "styled-components";
import theme from "../../../style/theme/theme";

export default function OrderBox ({ id, category, menu, clicked }) {
    const menuLen = menu.length;
    return(
        <OrderBoxContainer clicked={clicked}>
            <OrderBoxSpan width={"15%"} size="big" align="right">{id}</OrderBoxSpan>
            <OrderBoxSpan width={"20%"} size="big" align="center">{category === 1 ? "매장" : "픽업"}</OrderBoxSpan>
            <OrderBoxSpan width={"65%"} size="small" align="left">
                {menuLen > 1 ? `${menu[0].name} 외 ${menuLen - 1}건` : menu[0].name}
            </OrderBoxSpan>
        </OrderBoxContainer>
    )
};

const OrderBoxContainer = styled.div`
    width: 100%;
    height: 3.75rem;
    // border-top: 0.5px solid ${theme.colors.text};
    border-bottom: 1px solid ${theme.colors.text};
    display: flex;
    align-items: center;
    background-color: ${(props) => props.clicked && theme.colors.clickColor};

    @media (max-width: 768px) {
        height: 4.5rem;
    }
`;

const OrderBoxSpan = styled.span`
    text-align: ${(props) => props.align};
    color: ${theme.colors.title};
    width: ${(props) => props.width};
    font-family: "Pretendard Variable";
    ${(props) => props.size === "big" ? css`
        font-size: 1.1rem;
        font-family: "Pretendard Variable";
        font-weight: 800;
    ` : css`
        font-size: 0.9rem;
        font-family: "Pretendard Variable";
        font-weight: 600;
    `}

    @media (max-width: 768px) {
        font-size: ${(props) => props.size === "big" ? '1.3rem' : '1.1rem'};
    }

    @media (max-width: 480px) {
        font-size: ${(props) => props.size === "big" ? '1.4rem' : '1.2rem'};
    }
`;

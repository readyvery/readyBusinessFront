import styled, { css } from "styled-components";
import theme from "../../../style/theme/theme";

export default function OrderBox ({ id, category, menu, clicked }) {
    return(
        <OrderBoxContainer clicked={clicked}>
            <OrderBoxSpan width={"15%"} size="big" align="right">{id}</OrderBoxSpan>
            <OrderBoxSpan width={"15%"} size="big" align="center">{category}</OrderBoxSpan>
            <OrderBoxSpan width={"70%"} size="small" align="left">{menu}</OrderBoxSpan>
        </OrderBoxContainer>
    )
};

const OrderBoxContainer = styled.div`
    width: 100%;
    height: 50px;
    line-height: 50px;
    // border-top: 0.5px solid ${theme.colors.text};
    border-bottom: 1px solid ${theme.colors.text};
    display: flex;
    background-color: ${(props) => props.clicked && theme.colors.clickColor};
`;

const OrderBoxSpan = styled.span`
    text-align: ${(props) => props.align};;
    color: ${theme.colors.title};
    width: ${(props) => props.width};
    ${(props) => props.size === "big" ? css`
        font-size: 1rem;
        font-family: Bold;
    ` : css`
        font-size: 0.8rem;
        font-family: SemiBold;
    `}
`;
import styled, { css } from "styled-components";

import React from "react";
import theme from "../../../style/theme/theme";

export default function StatusHeader ({status, onClickHandler, children}) {
    return(
        <Container>
            <StatusContainer>
                {children}
            </StatusContainer>
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    height: 60px;
    border-bottom: 8px solid ${theme.colors.MainColor};
`;

const StatusContainer = styled.div`
    width: 90%;
    height: 100%;
    margin: 0 auto;
    display: flex;
`;

const StatusBtn = styled.div`
    width: 50%;
    height: 100%;
    color: #fff;
    background-color: ${theme.colors.MainColor};
    border-radius: 15px 15px 0 0;

    display: flex;
    align-items: center;
    justify-content: center;

    ${(props) => props.clicked ? 
        css`
            color: #fff;
            background-color: ${theme.colors.MainColor};
        ` : 
        css`
            color: ${theme.colors.text};
            background-color: #fff;
        `
    }
`;

const StatusTxt = styled.span`
    font-size: 1.25rem;
    font-family: Bold;
`;
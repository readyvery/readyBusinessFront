import styled from "styled-components";

import React from "react";
import theme from "../../../style/theme/theme";

export default function StatusHeader ({children}) {
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
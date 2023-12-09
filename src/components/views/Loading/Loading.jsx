import React, { useEffect } from "react";
import styled from "styled-components";
import ModalContainer from "./ModalContainer";

function Loading() {
  useEffect(() => {
    const $body = document.querySelector("body");
    const overflow = $body.style.overflow;
    $body.style.overflow = "auto";
    return () => {
      $body.style.overflow = overflow;
    };
  }, []);
  return (
    <ModalContainer>
      <Background>
        <LoadingParentDiv>
          <LoadingDiv>
            <LoadingText>네트워크를 확인해주세요.</LoadingText>
          </LoadingDiv>
          <LoadingDiv>
            <img src="./loading.gif" alt="로딩중" width="10%" />
          </LoadingDiv>
        </LoadingParentDiv>
      </Background>
    </ModalContainer>
  );
}

export default Loading;

const Background = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index: 9999;
`;

const LoadingText = styled.div`
  font: 1rem "Noto Sans KR";
  text-align: center;
`;
const LoadingDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const LoadingParentDiv = styled.div`
  margin-top: 40vh;
`;

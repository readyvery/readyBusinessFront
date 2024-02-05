import React from "react";
import { useNavigate } from "react-router-dom";
import Container from "../../../../components/login/Container/Container";
import RedButton from "../../../../components/login/redButton/RedButton";
import "./NoneFindIdPage.css";
function NoneFindIdPage() {
  const navigate = useNavigate();
  const is480 = window.innerWidth <= 480;
  const containerSize = is480
    ? ["25rem", "37.5rem", "4.13rem", "1.06rem"]
    : ["31.3rem", "37.5rem", "5.56rem", "1.38rem"];

  return (
    <Container
      title={"아이디 찾기"}
      containerWidth={containerSize[0]}
      containerHeight={containerSize[1]}
      logoMarginTop={containerSize[2]}
      logoMarginBottom={containerSize[3]}
    >
      <div className="none-find-id-page-frame">
        <div className="none-find-id-page-text">
          존재하지 않는 아이디입니다.
        </div>
        <div
          className="none-find-id-page-wrapper"
          onClick={() => navigate(`/signup`)}
        >
          <RedButton>회원가입</RedButton>
          <button
            className="none-find-id-page-button"
            onClick={() => navigate(`/`)}
          >
            로그인
          </button>
        </div>
      </div>
    </Container>
  );
}

export default NoneFindIdPage;

import React from "react";
import { Link } from "react-router-dom";
import Container from "../../../../components/login/Container/Container";
import RedButton from "../../../../components/login/redButton/RedButton";
import "./UserFindIdPage.css";

function UserFindIdPage() {
  const is480 = window.innerWidth <= 480;
  const containerSize = is480
    ? ["25rem", "37.5rem", "4.13rem", "1.06rem"]
    : ["31.3rem", "37.5rem", "5.56rem", "1.38rem"];

  const idText = "kjwoo0121@naver.com"; //서버에서 값 가져오기
  return (
    <Container
      title={"아이디 찾기"}
      containerWidth={containerSize[0]}
      containerHeight={containerSize[1]}
      logoMarginTop={containerSize[2]}
      logoMarginBottom={containerSize[3]}
    >
      <div className="user-find-id-page-frame">
        <div className="loginpage-findId-text">
          <span>가입하신 아이디는 아래와 같습니다.</span>
          <input
            type="text"
            defaultValue={"아이디: " + idText}
            className="user-find-id-page-text-output"
            readOnly
          />
        </div>
        <div className="user-find-id-page-link-wrapper">
          <Link to={"/signup"}>
            <RedButton>로그인</RedButton>
          </Link>
          <button className="user-find-id-page-login-link-button">
            <Link to="/login" className="user-find-id-page-login-link">
              비밀번호 찾기
            </Link>
          </button>
        </div>
      </div>
    </Container>
  );
}

export default UserFindIdPage;

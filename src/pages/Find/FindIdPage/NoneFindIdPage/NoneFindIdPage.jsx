import React from "react";
import Container from "../../../../components/login/Container/Container";
import "./NoneFindIdPage.css";
import RedButton from "../../../../components/login/redButton/RedButton";
import { Link } from "react-router-dom";
function NoneFindIdPage () {
    const is480 = window.innerWidth <= 480;
    const containerSize = is480
      ? ["20rem", "30rem", "3.3rem"]
      : ["25rem", "30rem", "4.55rem"];
  
    return(
    <Container title={"아이디 찾기"} containerWidth={containerSize[0]} containerHeight={containerSize[1]} logoMarginTop={containerSize[2]} logoMarginBottom={"2.55rem"}>
            <div className="none-find-id-page-frame">
                <div className="none-find-id-page-text">존재하지 않는 아이디입니다.</div>
                <div className="none-find-id-page-link-wrapper">
                    <Link to={"/signup"}>
                        <RedButton>회원가입</RedButton>
                    </Link>
                    <button className="none-find-id-page-link-button">
                        <Link to="/" className="none-find-id-page-login-link">로그인</Link>
                    </button>
                </div>   
            </div>     
        </Container>
    )
}

export default NoneFindIdPage;
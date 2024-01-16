import React from "react";
import Container from "../../../../components/login/Container/Container";
import "./NoneFindIdPage.css";
import RedButton from "../../../../components/login/redButton/RedButton";
import { Link } from "react-router-dom";
function NoneFindIdPage () {
    return(
        <Container title={"아이디찾기"} containerWidth={"25rem"} containerHeight={"30rem"} logoMarginTop={"4.55rem"} logoMarginBottom={"2.55rem"}>
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
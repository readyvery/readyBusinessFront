import React from "react";
import Container from "../../../../components/login/Container/Container";
import "./UserFindIdPage.css";
import RedButton from "../../../../components/login/redButton/RedButton";
import { Link } from "react-router-dom";

function UserFindIdPage () {
    const idText ="kjwoo0121@naver.com";//서버에서 값 가져오기
    return(
        <Container title={"아이디찾기"} containerWidth={"25rem"} containerHeight={"30rem"} logoMarginTop={"4.55rem"} logoMarginBottom={"2.55rem"}>
            <div className="user-find-id-page-frame">
                <div className="loginpage-findId-text">
                    <span>가입하신 아이디는 아래와 같습니다.</span>
                    <input 
                    type="text"
                    defaultValue={"아이디: "+idText}
                    className="user-find-id-page-text-output"
                    />
                </div>
                <div className="user-find-id-page-link-wrapper">
                    <Link to={"/signup"}>
                        <RedButton>로그인</RedButton>
                    </Link>
                    <button className="user-find-id-page-login-link-button">
                        <Link to="/login" className="user-find-id-page-login-link">비밀번호 찾기</Link>
                    </button>
                </div>   
            </div>     
        </Container>
    )
}

export default UserFindIdPage;
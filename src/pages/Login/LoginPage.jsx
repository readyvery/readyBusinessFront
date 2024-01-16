import Container from "../../components/login/Container/Container";
import "./LoginPage.css";
// import { useState } from "react";
import RedButton from "../../components/login/redButton/RedButton";
import { Link } from "react-router-dom";
// import LoginChkAlrm from "../../components/login/LoginChkAlrm/LoginChkAlrm";

const LoginFindUserIdAndPassword=()=>{
    return(
        <div className="loginpage-find-user-id-and-password">
            <div className="loginpage-form-find">
                <Link to="/find/id" className="loginpage-form-find-id">아이디 찾기</Link>
                <span>•</span>
                <Link to="/find/password" className="loginpage-form-find-password">비밀번호 찾기</Link>
            </div>
        </div>
    )
}
function LoginPage () {
    // 로그인값 받아오기..
    // const [userData, setUserData] = useState(true);
    return(
        <Container title={"통합로그인"} containerWidth={"25rem"} containerHeight={"30rem"} logoMarginTop={"4.55rem"} logoMarginBottom={"2.55rem"}>
            <form className="loginpage-form">
                <input id="username" type="text" placeholder="아이디" required name="username" className="loginpage-user-id"/>
                <input id="password" type="password" placeholder="비밀번호" required name="usernamepassword" className="loginpage-user-password"/>
                {/* {!userData &&<LoginChkAlrm icon={"X"} paddingSize={"0.45rem"}>아이디 또는 비밀번호가 일치하지 않습니다.</LoginChkAlrm>} */}
                <LoginFindUserIdAndPassword/>
                <div className="loginpage-form-login-wrapper">
                    <RedButton type="submit">로그인</RedButton>
                </div>
            </form>
                <button className="loginpage-sign-button">
                <Link to="/signup" className="loginpage-sign-link">회원가입</Link>
            </button>
        </Container>
    )
}

export default LoginPage;
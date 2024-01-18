import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginState } from "../../Atom/status";
import Container from "../../components/login/Container/Container";
import LoginChkAlrm from "../../components/login/LoginChkAlrm/LoginChkAlrm";
import RedButton from "../../components/login/redButton/RedButton";
import "./LoginPage.css";

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
    const is480 = window.innerWidth <= 480;
    const containerSize = is480
      ? ["20rem", "30rem", "3.3rem"]
      : ["25rem", "30rem", "4.55rem"];
    
    // 로그인값 받아오기..
    // const [userData, setUserData] = useState(true);

    // 로그인 내용
    const [loginInfo, setLoginInfo ] = useRecoilState(loginState);
    const [EmailText,setEmailText] = useState("");
    const [Password, setPassword] = useState("");

    const onEmailHandler = (event) => {
        setEmailText(event.currentTarget.value);
      };
    
      const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
      };

    const handleLogin = async ( ) => {
        alert(1);
        try {
            const apiUrl = process.env.REACT_APP_API_ROOT;
            const response = await axios.post(`${apiUrl}/api/v1/user/login`, {
                email: EmailText,
                password: Password
            });

            console.log(response.data)
            if (response.data.success) {
                // 로그인 성공: Recoil 상태와 localStorage에 토큰 저장
                setLoginInfo({
                  ...loginInfo,
                  accessToken: response.data.accessToken,
                  refreshToken: response.data.refreshToken,
                });
                localStorage.setItem('accessToken', response.data.accessToken);
                localStorage.setItem('refreshToken', response.data.refreshToken);
                console.log('로그인 성공:', response.data.message);
              } else {
                console.log('로그인 실패:', response.data.message);
              }
            } catch (error) {
              console.error('로그인 요청 실패:', error);
        }
     };

    return(
        <Container title={"통합 로그인"} containerWidth={containerSize[0]} containerHeight={containerSize[1]} logoMarginTop={containerSize[2]} logoMarginBottom={"2.55rem"}>
            <form className="loginpage-form">
                <input type="email" name="userName" placeholder="Email" value={EmailText} onChange={onEmailHandler} className="loginpage-user-id"/>
                <input type="password"  name="userPassword" placeholder="Password"  value={Password} onChange={onPasswordHandler} className="loginpage-user-password"/>
                {!loginInfo &&<LoginChkAlrm icon={"X"} paddingSize={"0.45rem"}>아이디 또는 비밀번호가 일치하지 않습니다.</LoginChkAlrm>}
                <LoginFindUserIdAndPassword/>
                <div className="loginpage-form-login-wrapper">
                    <RedButton type="submit" onClick={handleLogin} className="loginButton">로그인</RedButton>
                </div>
            </form>
                <button className="loginpage-sign-button">
                <Link to="/signup" className="loginpage-sign-link">회원가입</Link>
            </button>
        </Container>
    )
}

export default LoginPage;
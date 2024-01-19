import Axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "../../components/login/Container/Container";
import RedButton from "../../components/login/redButton/RedButton";
import "./LoginPage.css";

const LoginFindUserIdAndPassword = () => {
  return (
    <div className="loginpage-find-user-id-and-password">
      <div className="loginpage-form-find">
        <Link to="/find/id" className="loginpage-form-find-id">
          아이디 찾기
        </Link>
        <span>•</span>
        <Link to="/find/password" className="loginpage-form-find-password">
          비밀번호 찾기
        </Link>
      </div>
    </div>
  );
};
function LoginPage() {
  const is480 = window.innerWidth <= 480;
  const containerSize = is480
    ? ["20rem", "30rem", "3.3rem"]
    : ["25rem", "30rem", "4.55rem"];

  // 로그인값 받아오기..
  // const [userData, setUserData] = useState(true);

  // 로그인 내용

  const [EmailText, setEmailText] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();

  const onEmailHandler = (event) => {
    setEmailText(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    console.log("로그인 버튼 클릭");
    try {
      const apiUrl = process.env.REACT_APP_API_ROOT;
      const response = await Axios.post(`${apiUrl}/api/v1/user/login`, {
        email: EmailText,
        password: Password,
      });

      if (response.data.success) {
        // 로그인 성공: Recoil 상태와 localStorage에 토큰 저장
        localStorage.clear();
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        console.log("로그인 성공:", response.data);
        console.log(localStorage.accessToken)
        console.log(localStorage.refreshToken)
        navigate("/home");
      } else {
        console.log("로그인 실패:", response.data);
      }
    } catch (error) {
      console.error("로그인 요청 실패:", error);
    }
  };

  return (
    <Container
      title={"통합 로그인"}
      containerWidth={containerSize[0]}
      containerHeight={containerSize[1]}
      logoMarginTop={containerSize[2]}
      logoMarginBottom={"2.55rem"}
    >
      <form className="loginpage-form">
        <input
          type="email"
          placeholder="Email"
          value={EmailText}
          onChange={onEmailHandler}
          className="loginpage-user-id"
        />
        <input
          type="password"
          placeholder="Password"
          value={Password}
          onChange={onPasswordHandler}
          className="loginpage-user-password"
        />
        {/* {!loginInfo && (
          <LoginChkAlrm icon={"X"} paddingSize={"0.45rem"}>
            아이디 또는 비밀번호가 일치하지 않습니다.
          </LoginChkAlrm>
        )} */}
        <LoginFindUserIdAndPassword />
        <div className="loginpage-form-login-wrapper">
          <RedButton
            type="submit"
            onClick={onSubmitHandler}
            className="loginButton"
          >
            로그인
          </RedButton>
        </div>
      </form>
      <button className="loginpage-sign-button">
        <Link to="/signup" className="loginpage-sign-link">
          회원가입
        </Link>
      </button>
    </Container>
  );
}

export default LoginPage;
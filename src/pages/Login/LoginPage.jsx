import { message } from "antd";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { loginState } from "../../Atom/status";
import Container from "../../components/login/Container/Container";
import RedButton from "../../components/login/redButton/RedButton";
import "./LoginPage.css";

const LoginFindUserIdAndPassword = () => {
  const navigate = useNavigate();
  return (
    <div className="loginpage-find-user-id-and-password">
      <div className="loginpage-form-find">
        <span onClick={() => navigate(`/find/id`)}>아이디 찾기</span>
        <span>•</span>
        <span onClick={() => navigate(`/find/password`)}>비밀번호 찾기</span>
      </div>
    </div>
  );
};

function LoginPage() {
  const [is480, setIs480] = useState(window.innerWidth <= 480);
  const containerSize = is480
    ? ["25rem", "37.5rem", "4.12rem", "3.63rem"]
    : ["31.3rem", "37.5rem", "5.69rem", "3.25rem"];

  useEffect(() => {
    const handleResize = () => {
      setIs480(window.innerWidth <= 480);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const apiUrl = process.env.REACT_APP_API_ROOT;
  const navigate = useNavigate();

  // 로그인 내용
  const setLoginToken = useSetRecoilState(loginState);

  const [EmailText, setEmailText] = useState("");
  const [Password, setPassword] = useState("");
  // const navigate = useNavigate();

  const onEmailHandler = (event) => {
    setEmailText(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = async () => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/v1/user/login`,
        {
          email: EmailText,
          password: Password,
        },
        { withCredentials: true }
      );
      console.log(response);

      const { role, success } = response.data;
      if (success) {
        // 로그인 성공: Recoil에 AT와 만료시간 저장
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("expiredTime", moment().add(1, "minutes").format("yyyy-MM-DD HH:mm:ss")); // 만료시간 저장
        console.log("로그인 성공:", response.data);
        message.success("로그인에 성공하셨습니다!");

        switch (role) {
          case "USER":
            navigate("/signup/auth/results");
            break;

          case "REVIEW":
            navigate("/signup/auth/results/before");
            break;

          case "REJECT":
            navigate("/signup/auth/results/reject");
            break;

          case "READY":
            navigate("/main");
            break;

          case "CEO":
            navigate("/main");
            break;

          default:
        }
      } else {
        console.log("로그인 실패:", response.data);
      }
    } catch (error) {
      const { status } = error.response;
      console.error("로그인 요청 실패:", error);
      if (status === 400) {
        message.error("아이디 또는 비밀번호가 일치하지 않습니다.");
      }
    }
  };

  return (
    <Container
      title={"통합 로그인"}
      containerWidth={containerSize[0]}
      containerHeight={containerSize[1]}
      logoMarginTop={containerSize[2]}
      logoMarginBottom={containerSize[3]}
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
            type="button"
            onClick={onSubmitHandler}
            className="loginButton"
          >
            로그인
          </RedButton>
        </div>
      </form>
      <button
        className="loginpage-sign-button"
        onClick={() => navigate(`/signup/auth/terms`)}
      >
        회원가입
      </button>
    </Container>
  );
}

export default LoginPage;

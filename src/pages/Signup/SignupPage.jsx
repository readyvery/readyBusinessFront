import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { loginState, userConfirmPasswordState, userIdState, userNameState, userPasswordState } from "../../Atom/status";
import Container from "../../components/login/Container/Container";
import RedButton from "../../components/login/redButton/RedButton";
import CircleNumBar from "../../components/signup/CircleNumBar/CircleNumBar";
import UserInputId from "../../components/signup/UserInput/UserInputId/UserInputId";
import UserInputName from "../../components/signup/UserInput/UserInputName/UserInputName";
import UserInputPassword from "../../components/signup/UserInput/UserInputPassword/UserInputPassword";
import "./SignupPage.css";

function SignupPage () {
    const navigate = useNavigate();

    const userId = useRecoilValue(userIdState);
    const userPassword = useRecoilValue(userPasswordState);
    const userConfirmPassword = useRecoilValue(userConfirmPasswordState);
    const userName = useRecoilValue(userNameState);
    const setLoginToken = useSetRecoilState(loginState);
    // console.log(userId);
    // console.log(userPassword);
    // console.log(userName);

    const handleRedButtonClick = async () => {
        // navigate('/signup/auth/phone');
        const apiUrl = process.env.REACT_APP_API_ROOT;
        try {
            const response = await axios.post(`${apiUrl}/api/v1/user/join`, {
              email: userId,
              password: userPassword,
              confirmPassword: userConfirmPassword,
              name: userName,
            });
      
            if (response.data.success) {
              console.log("인증성공", response.data);
              // setIsAuth(true);
              try {
                const res = await axios.post(`${apiUrl}/api/v1/user/login`, {
                  email: userId,
                  password: userPassword,
                }, {withCredentials: true})
                console.log(res);
          
                if (response.data.success) {
                  // 로그인 성공: Recoil에 AT와 만료시간 저장
                  setLoginToken({
                    accessToken: response.data.accessToken,
                    expiredTime: moment().add(1, "day").format("yyyy-MM-DD HH:mm:ss")
                  });
                  // localStorage.setItem('accessToken', response.data.accessToken);
                  console.log("로그인 성공:", response.data);
                  navigate("/signup/auth/phone");
                } else {
                  console.log("로그인 실패:", response.data);
                }
              } catch (error) {
                console.error("로그인 요청 실패:", error);
              }
            } else {
              console.log("인증실패", response.data);
              // setIsAuth(false);
            }
          } catch (error) {
            console.log("통신에러", error);
          }
    }
    const is480 = window.innerWidth <= 480;
    const containerSize = is480
      ? ["20rem", "40rem", "3.15rem"]
      : ["30rem", "50rem", "3.9rem"];
    
    return(
        <Container title={"회원가입"} containerWidth={containerSize[0]} containerHeight={containerSize[1]} logoMarginTop={containerSize[2]} logoMarginBottom="2.45rem">
                <CircleNumBar step="1"/>
                <div className="signup-page-content-container">
                    <UserInputId/>
                    <UserInputPassword />
                    <UserInputName />
                    <div className="signup-page-next-button">
                        <RedButton onClick={handleRedButtonClick}>다음</RedButton>
                    </div>
                    
                </div>
        </Container>
    )
}

export default SignupPage;
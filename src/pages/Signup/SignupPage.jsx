import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import {
  userConfirmPasswordState,
  userIdDuplicateState,
  userIdState,
  userNameState,
  userPasswordState
} from "../../Atom/status";
import Container from "../../components/login/Container/Container";
import RedButton from "../../components/login/redButton/RedButton";
import CircleNumBar from "../../components/signup/CircleNumBar/CircleNumBar";
import UserInputId from "../../components/signup/UserInput/UserInputId/UserInputId";
import UserInputName from "../../components/signup/UserInput/UserInputName/UserInputName";
import UserInputPassword from "../../components/signup/UserInput/UserInputPassword/UserInputPassword";
import "./SignupPage.css";

function SignupPage() {
  const navigate = useNavigate();

  const userDuplicatecheck = useRecoilValue(userIdDuplicateState);
  const userPwd = useRecoilValue(userPasswordState);
  const userConfirmPwd = useRecoilValue(userConfirmPasswordState);
  const userId = useRecoilValue(userIdState);
  const userName = useRecoilValue(userNameState);

  const handleRedButtonClick = () => {
    if (!userId || !userPwd || !userConfirmPwd || !userName) {
      alert('모든 정보를 입력해주세요');
      return;
    }
    
    if (userDuplicatecheck === false) {
      navigate('/signup/auth/phone');
    } else {
      alert('아이디 중복 체크를 해주세요');
    }
  };
  const is480 = window.innerWidth <= 480;
  const containerSize = is480
    ? ["25rem", "50rem", "3.94rem", "2.75rem"]
    : ["37.5rem", "62.5rem", "4.88rem", "3.38rem"];

  return (
    <Container
      title={"회원가입"}
      containerWidth={containerSize[0]}
      containerHeight={containerSize[1]}
      logoMarginTop={containerSize[2]}
      logoMarginBottom={containerSize[3]}
    >
      <CircleNumBar step="1" />
      <div className="signup-page-content-container">
        <UserInputId />
        <UserInputPassword />
        <UserInputName />
        <div className="signup-page-next-button">
          <RedButton onClick={handleRedButtonClick}>다음</RedButton>
        </div>
      </div>
    </Container>
  );
}

export default SignupPage;

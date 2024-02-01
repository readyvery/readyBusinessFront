import { useNavigate } from "react-router-dom";
import Container from "../../components/login/Container/Container";
import RedButton from "../../components/login/redButton/RedButton";
import CircleNumBar from "../../components/signup/CircleNumBar/CircleNumBar";
import UserInputId from "../../components/signup/UserInput/UserInputId/UserInputId";
import UserInputName from "../../components/signup/UserInput/UserInputName/UserInputName";
import UserInputPassword from "../../components/signup/UserInput/UserInputPassword/UserInputPassword";
import "./SignupPage.css";

function SignupPage () {
    const navigate = useNavigate();

    const handleRedButtonClick = () => {
        navigate('/signup/auth/phone');
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
import "./SignupPage.css";
import CircleNumBar from "../../components/signup/CircleNumBar/CircleNumBar";
import UserInputId from "../../components/signup/UserInput/UserInputId/UserInputId";
import UserInputPassword from "../../components/signup/UserInput/UserInputPassword/UserInputPassword";
import UserInputName from "../../components/signup/UserInput/UserInputName/UserInputName";
import RedButton from "../../components/login/redButton/RedButton"
import Container from "../../components/login/Container/Container";

function SignupPage () {

    return(
        <Container title="회원가입" containerWidth="30rem" containerHeight="50rem" logoMarginTop="3.9rem" logoMarginBottom="2.45rem" >
                <CircleNumBar step="1"/>
                <div className="signup-page-content-container">
                    <UserInputId/>
                    <UserInputPassword />
                    <UserInputName />
                    <div className="signup-page-next-button">
                        <RedButton>다음</RedButton>
                    </div>
                    
                </div>
        </Container>
    )
}

export default SignupPage;
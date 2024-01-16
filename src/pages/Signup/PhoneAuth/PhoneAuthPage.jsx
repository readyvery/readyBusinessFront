import "./PhoneAuthPage.css";
import CircleNumBar from "../../../components/signup/CircleNumBar/CircleNumBar";
import Container from "../../../components/login/Container/Container";
import UserInputNumber from "../../../components/signup/UserInput/UserInputNumber/UserInputNumber";

function PhoneAuthPage () {

    return(
        <Container title="회원가입" containerWidth="30rem" containerHeight="40rem" logoMarginTop="4.5rem" logoMarginBottom="2.45rem" >
                <CircleNumBar step="1"/>
                <div className="signup-page-content-container">
                    <UserInputNumber/>
                </div>
        </Container>
    )
}

export default PhoneAuthPage;
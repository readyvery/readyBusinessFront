import "./PhoneAuthPage.css";
import CircleNumBar from "../../../components/signup/CircleNumBar/CircleNumBar";
import Container from "../../../components/login/Container/Container";
import UserInputNumber from "../../../components/signup/UserInput/UserInputNumber/UserInputNumber";

function PhoneAuthPage () {
    const is480 = window.innerWidth <= 480;
    const containerSize = is480
      ? ["20rem", "30rem", "2.05rem"]
      : ["30rem", "40rem", "4.5rem"];
    
    return(
        <Container title="시작하기" containerWidth={containerSize[0]} containerHeight={containerSize[1]} logoMarginTop={containerSize[2]} logoMarginBottom="2.45rem">
                <CircleNumBar step="1"/>
                <div className="signup-page-content-phone-container">
                    <UserInputNumber/>
                </div>
        </Container>
    )
}

export default PhoneAuthPage;
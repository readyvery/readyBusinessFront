import "./VerificationPage.css";
import CircleNumBar from "../../../components/signup/CircleNumBar/CircleNumBar";
import RedButton from "../../../components/login/redButton/RedButton"
import Container from "../../../components/login/Container/Container";
import UserInputStoreInformation from "../../../components/signup/UserInput/UserInputStoreInformation/UserInputStoreInformation";

function VerificationPage () {
    const is480 = window.innerWidth <= 480;
    const containerSize = is480
      ? ["20rem", "43.85rem", "1.5rem"]
      : ["35rem", "72.55rem", "3.8rem"];
  
    return(
        <Container title="회원가입" containerWidth={containerSize[0]} containerHeight={containerSize[1]} logoMarginTop={containerSize[2]} logoMarginBottom="2.7rem">
                <CircleNumBar step="2"/>
                <div className="signup-page-content-container">
                    <UserInputStoreInformation/>
                    <div className="signup-page-verification-next-button">
                        <RedButton>승인요청 신청</RedButton>
                    </div>
                </div>
        </Container>
    )
}

export default VerificationPage;



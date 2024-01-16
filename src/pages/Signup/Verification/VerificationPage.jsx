import "./VerificationPage.css";
import CircleNumBar from "../../../components/signup/CircleNumBar/CircleNumBar";
import RedButton from "../../../components/login/redButton/RedButton"
import Container from "../../../components/login/Container/Container";
import UserInputStoreInformation from "../../../components/signup/UserInput/UserInputStoreInformation/UserInputStoreInformation";

function VerificationPage () {

    return(
        <Container title="회원가입" containerWidth="35rem" containerHeight="72.55rem" logoMarginTop="3.8rem" logoMarginBottom="2.7rem" >
                <CircleNumBar step="2"/>
                <div className="signup-page-content-container">
                    <UserInputStoreInformation/>
                    <div className="signup-page-next-button">
                        <RedButton>승인요청 신청</RedButton>
                    </div>
                </div>
        </Container>
    )
}

export default VerificationPage;



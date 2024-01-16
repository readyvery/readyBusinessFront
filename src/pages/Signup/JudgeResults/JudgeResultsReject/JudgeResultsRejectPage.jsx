import RedButton from "../../../../components/login/redButton/RedButton"
import Container from "../../../../components/login/Container/Container";
import deleteicon from "../../../../assets/icons/icon_delete.svg";
import "./JudgeResultsRejectPage.css";
function JudgeResultsRejectPage () {

    return(
        <Container title="심사반려" containerWidth="25rem" containerHeight="25rem" logoMarginTop="3.52rem" logoMarginBottom="2.9rem" >
            <img src={deleteicon} alt="deleteicon" className="judge-results-reject-page-top-positon-icon" />
                <div className="">
                    <span className="judge-results-reject-page-content-text-style">심사가 반려되었습니다</span>
                    <div className="judge-results-reject-page-content-main-text-style">
                        <span>반려 사유는 회원가입 시 작성한 </span>
                        <span>이메일(아이디)를 통해 확인하실 수 있습니다.</span>
                    </div>

                    <div className="judge-results-reject-page-next-button">
                        <RedButton>재신청하기</RedButton>
                    </div>
                </div>
        </Container>
    )
}

export default JudgeResultsRejectPage;
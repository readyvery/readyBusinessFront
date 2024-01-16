import CircleNumBar from "../../../components/signup/CircleNumBar/CircleNumBar";
import RedButton from "../../../components/login/redButton/RedButton"
import Container from "../../../components/login/Container/Container";
import logo from "../../../assets/icons/Big_LOGO.svg";
import redyveryicon from "../../../assets/icons/img_readyVery.svg";
import kakaolinkedicon from "../../../assets/icons/icon_kakao.svg";
import basketicon from "../../../assets/icons/icon_basket.svg";
import "./JudgeResultsBeforePage.css";
function JudgeResultsBeforePage () {

    return(
        <Container title="입점 신청 완료" containerWidth="30rem" containerHeight="40rem" logoMarginTop="4.1rem" logoMarginBottom="1.5rem" >
            <img src={basketicon} alt="basketicon" className="judge-results-before-page-top-positon-icon" />
                <CircleNumBar step="3"/>
                <div className="judge-results-before-page-content-container">
                    <span className="judge-results-before-page-content-text-style">입점 신청이 완료되었습니다</span>
                    <div className="judge-results-before-page-content-main-text-style">
                        <span>1~2일 이내로 <img src={logo} alt="logo" style={{ 'width': '4.05rem', 'height': '0.8rem'}} /> 담당자가 사장님께 전화를 드리거나 </span>
                        <span>가게를 방문하여 입점을 도와드립니다.</span>
                        <span className="judge-results-before-page-content-main-text-tab">궁금한 사항이나 도움이 필요하면 언제든지 문의해 주세요.</span>
                    </div>
                    <div className="redyvery-linked-message-for-kakao">
                        <img src={redyveryicon} alt="redyveryicon" style={{ 'width': '2rem', 'height': '2rem'}} />
                        <div className="redyvery-linked-message-for-kakao-font">
                            <div className="redyvery-linked-message-for-kakao-title">레디베이 상담</div>
                            <div className="redyvery-linked-message-for-kakao-time">매일 00:00 ~ 24:00</div>
                        </div>
                        <img src={kakaolinkedicon} alt="kakaolinkedicon" style={{ 'width': '2rem', 'height': '1rem'}} />
                    </div>

                    <div className="judge-results-before-page-next-button">
                        <RedButton>확인</RedButton>
                    </div>
                </div>
        </Container>
    )
}

export default JudgeResultsBeforePage;
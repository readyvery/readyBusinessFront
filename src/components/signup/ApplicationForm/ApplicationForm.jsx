import logo from "../../../assets/icons/Big_LOGO.svg";
import "./ApplicationForm.css";
import redyveryicon from "../../../assets/icons/img_readyVery.svg";
import kakaolinkedicon from "../../../assets/icons/icon_kakao.svg";
import RedButton from "../../login/redButton/RedButton";
import checkicon from "../../../assets/icons/icon_check_black.svg"
const ApplicationFormContainer = ({ children }) =>{
    return(
        <div className="application-form-container-wrapper">
            <div className="application-form-container-wrapper-inner">
                <div className="application-form-wrapper">
                    <span><img src={logo} alt="logo" style={{ 'width': '3rem', 'height': '0.7rem'}} /></span>
                    <div className="application-form-container-text">입점 신청서</div>
                </div>

                <div>
                    { children }
                </div>
            </div>
        </div>
    )
};

const ApplicationFormCircleNumBar = () => {
    const ApplicationFormCircleNumWrapper = ({ text, children }) => {
        return (
            <div className={"application-form-circle-num-wapper"}>
                {text}
                <div>
                    {children}
                </div>
            </div>
        );
    }
    const ApplicationFormCircleNumText = ({ bartext }) => {
        return(
        <div className="application-form-circle-num-ber-text-wrapper">
            <div className={"application-form-circle-num-bar-text-content"}>
                {bartext}
            </div>
         </div>
        )
    }
    return (
        <div className="application-form-circle-num-ber-wrapper">
            <ApplicationFormCircleNumWrapper text="1">
                <ApplicationFormCircleNumText bartext="회원가입"/>
            </ApplicationFormCircleNumWrapper>
            <div className={"application-form-bar-wapper"}/>
            <ApplicationFormCircleNumWrapper text="2">
                <ApplicationFormCircleNumText bartext="입점 신청서 입력"/>
            </ApplicationFormCircleNumWrapper>
            <div className={"application-form-bar-wapper"}/>
            <ApplicationFormCircleNumWrapper text="3" >
                <ApplicationFormCircleNumText bartext="입점 신청 완료"/>
            </ApplicationFormCircleNumWrapper>
        </div>
    );
};

const ApplicationForm = () =>{
    return(
        <ApplicationFormContainer>
                <ApplicationFormCircleNumBar step="3"/>
                <div className="application-form-content-container">
                    <div className="application-form-content-main-text-style">
                        <span>안녕하세요!</span>
                        <span><img src={logo} alt="logo" style={{ 'width': '3rem', 'height': '0.6rem'}} />와 함께하는 입점을 고려해 주셔서 감사합니다. </span>
                        <span>아래의 문서들을 미리 준비해 주시면</span>
                        <span>입점 신청이 더욱 수월하게 진행됩니다.</span>
                        <div className="application-form-content-sub-text-style">
                            <span style={{'marginBottom':'0.05rem'}}><img src={checkicon} alt="checkicon" style={{ 'width': '0.75rem', 'height': '0.7rem'}} />사업자등록증 (jpg 또는 jpeg 형식)</span>
                            <span style={{'marginBottom':'0.05rem'}}><img src={checkicon} alt="checkicon" style={{ 'width': '0.75rem', 'height': '0.7rem'}} />영업신고증 (jpg 또는 jpeg 형식)</span>
                            <span style={{'marginBottom':'0.05rem'}}><img src={checkicon} alt="checkicon" style={{ 'width': '0.75rem', 'height': '0.7rem'}} />신분증 (jpg 또는 jpeg 형식)</span>
                            <span><img src={checkicon} alt="checkicon" style={{ 'width': '0.75rem', 'height': '0.7rem'}} />통장사본 (jpg 또는 jpeg 형식)</span>
                        </div>
                        <span className="application-form-content-main-text-tab">작성 중 어움이 있으시면 아래 카카오톡 채팅방으로 연락 주세요.</span>
                    </div>

                    <div className="application-form-redyvery-linked-message-for-kakao">
                        <img src={redyveryicon} alt="redyveryicon" style={{ 'width': '1.4rem', 'height': '1.4rem'}} />
                        <div className="application-form-redyvery-linked-message-for-kakao-font">
                            <div className="application-form-redyvery-linked-message-for-kakao-title">레디베이 상담</div>
                            <div className="application-form-redyvery-linked-message-for-kakao-time">매일 00:00 ~ 24:00</div>
                        </div>
                        <img src={kakaolinkedicon} alt="kakaolinkedicon" style={{ 'width': '1.4rem', 'height': '1rem'}} />
                    </div>
                    <div className="application-form-next-button">
                        <RedButton>확인</RedButton>
                    </div>
                </div>
        </ApplicationFormContainer>
    )
}

export default ApplicationForm;
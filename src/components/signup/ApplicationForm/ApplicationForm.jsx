import { Link, useNavigate } from "react-router-dom";
import { IMAGES } from "../../../constants/images";
import RedButton from "../../login/redButton/RedButton";
import "./ApplicationForm.css";
const ApplicationFormContainer = ({ children }) => {
  return (
    <div className="application-form-container-wrapper">
      <div className="application-form-container-wrapper-inner">
        <div className="application-form-wrapper">
          <span>
            <img src={IMAGES.logo} alt="logo" />
          </span>
          <div className="application-form-container-text">시작하기</div>
        </div>

        <div>{children}</div>
      </div>
    </div>
  );
};

const ApplicationFormCircleNumBar = () => {
  const ApplicationFormCircleNumWrapper = ({ ispoint, text, children }) => {
    const textClassName = ispoint
      ? "application-form-circle-num-wapper-point"
      : "application-form-circle-num-wapper-non-point";
    return (
      <div className={`application-form-circle-num-wapper ${textClassName}`}>
        {text}
        <div>{children}</div>
      </div>
    );
  };
  const ApplicationFormCircleNumText = ({ ispoint, bartext }) => {
    const textClassName = ispoint
      ? "application-form-circle-num-bar-text-content-point"
      : "application-form-circle-num-bar-text-content-non-point";
    return (
      <div className="application-form-circle-num-ber-text-wrapper">
        <div
          className={`application-form-circle-num-bar-text-content ${textClassName}`}
        >
          {bartext}
        </div>
      </div>
    );
  };
  return (
    <div className="application-form-circle-num-ber-wrapper">
      <ApplicationFormCircleNumWrapper ispoint={true} text="1">
        <ApplicationFormCircleNumText ispoint={true} bartext="회원가입" />
      </ApplicationFormCircleNumWrapper>
      <div
        className={
          "application-form-bar-wapper application-form-bar-wapper-point"
        }
      />
      <ApplicationFormCircleNumWrapper ispoint={true} text="2">
        <ApplicationFormCircleNumText
          ispoint={true}
          bartext="입점 신청서 입력"
        />
      </ApplicationFormCircleNumWrapper>
      <div
        className={
          "application-form-bar-wapper application-form-bar-wapper-non-point"
        }
      />
      <ApplicationFormCircleNumWrapper ispoint={false} text="3">
        <ApplicationFormCircleNumText
          ispoint={false}
          bartext="입점 신청 완료"
        />
      </ApplicationFormCircleNumWrapper>
    </div>
  );
};

const ApplicationForm = () => {
  const navigate = useNavigate();
  return (
    <ApplicationFormContainer>
      <ApplicationFormCircleNumBar step="2" />
      <div className="application-form-content-container">
        <div className="application-form-content-main-text-style">
          <span>안녕하세요!</span>
          <span>
            <img src={IMAGES.logo} alt="logo" />와 함께하는 입점을 고려해 주셔서
            감사합니다.
          </span>
          <span>아래의 문서들을 미리 준비해 주시면</span>
          <span>입점 신청이 더욱 수월하게 진행됩니다.</span>
          <div className="application-form-content-sub-text-style">
            <div className="application-form-content-sub-text-style-in-check">
              <img
                src={IMAGES.store_application_form_check_gray}
                alt="checkicon"
              />
              <span>사업자등록증 (jpg 또는 jpeg 형식)</span>
            </div>
            <div className="application-form-content-sub-text-style-in-check">
              <img
                src={IMAGES.store_application_form_check_gray}
                alt="checkicon"
              />
              <span>영업신고증 (jpg 또는 jpeg 형식)</span>
            </div>
            <div className="application-form-content-sub-text-style-in-check">
              <img
                src={IMAGES.store_application_form_check_gray}
                alt="checkicon"
              />
              <span>신분증 (jpg 또는 jpeg 형식)</span>
            </div>
            <div className="application-form-content-sub-text-style-in-check">
              <img
                src={IMAGES.store_application_form_check_gray}
                alt="checkicon"
              />
              <span>통장사본 (jpg 또는 jpeg 형식) </span>
            </div>
          </div>
          <span className="application-form-content-main-text-tab">
            작성 중 어려움이 있으시면 아래 카카오톡 채팅방으로 연락 주세요.
          </span>
        </div>

        <div className="application-form-redyvery-linked-message-for-kakao">
          <img
            src={IMAGES.logo_open_chat}
            alt="redyveryicon"
            className="application-form-redyvery-linked-message-for-kakao-readyvery-img"
          />
          <div className="application-form-redyvery-linked-message-for-kakao-font">
            <div className="application-form-redyvery-linked-message-for-kakao-title">
              레디베이 상담
            </div>
            <div className="application-form-redyvery-linked-message-for-kakao-time">
              매일 00:00 ~ 24:00
            </div>
          </div>
          <Link to="http://pf.kakao.com/_ZxiEjG/chat">
            <div className="application-form-redyvery-linked-message-for-kakao-kakao-icon-wrapper">
              <img src={IMAGES.kakao_open_chat} alt="kakaolinkedicon" />
            </div>
          </Link>
        </div>
        <div className="application-form-next-button">
          <RedButton onClick={() => navigate("/signup/auth/verification")}>
            확인
          </RedButton>
        </div>
      </div>
    </ApplicationFormContainer>
  );
};

export default ApplicationForm;

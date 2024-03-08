import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "../../../components/login/Container/Container";
import RedButton from "../../../components/login/redButton/RedButton";
import CircleNumBar from "../../../components/signup/CircleNumBar/CircleNumBar";
import { IMAGES } from "../../../constants/images";
import "./JudgeResultsBeforePage.css";
function JudgeResultsBeforePage() {
  const navigate = useNavigate();
  const [is480, setIs480] = useState(window.innerWidth <= 480);
  const containerSize = is480
    ? ["25rem", "37.5rem", "4.88rem", "2.28rem"]
    : // 37.5 + 1.88 = 39.38, 3 + 1.88 = 4.88
      ["37.5rem", "52.75rem", "8rem", "3rem"];
  // 50 + 2.75 = 52.75, 5.25 + 2.75 = 8
  useEffect(() => {
    const handleResize = () => {
      setIs480(window.innerWidth <= 480);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <Container
      title={"입점 신청 완료"}
      containerWidth={containerSize[0]}
      containerHeight={containerSize[1]}
      logoMarginTop={containerSize[2]}
      logoMarginBottom={containerSize[3]}
    >
      <div className="judge-results-before-page-top-positon-icon-line" />
      <div className="judge-results-before-page-top-positon-icon-wrapper">
        <img
          src={IMAGES.store_application_good}
          alt="application_good"
          className="judge-results-before-page-top-positon-icon"
        />
      </div>
      <CircleNumBar step="3" />
      <div className="judge-results-before-page-content-container">
        <span className="judge-results-before-page-content-text-style">
          입점 신청이 완료되었습니다
        </span>
        <div className="judge-results-before-page-content-main-text-style">
          <span>
            1~2일 이내로 <img src={IMAGES.logo} alt="logo" />
            담당자가 사장님께 전화를 드리거나
          </span>
          <span>가게를 방문하여 입점을 도와드립니다.</span>
          <span className="judge-results-before-page-content-main-text-tab">
            궁금한 사항이나 도움이 필요하면 언제든지 문의해 주세요.
          </span>
        </div>
        <div className="redyvery-linked-message-for-kakao">
          <img
            src={IMAGES.logo_open_chat}
            alt="redyveryicon"
            className="redyvery-linked-message-for-readyvery-img"
          />
          <div>
            <div className="redyvery-linked-message-for-kakao-title">
              레디베이 상담
            </div>
            <div className="redyvery-linked-message-for-kakao-time">
              매일 00:00 ~ 24:00
            </div>
          </div>
          <Link to="http://pf.kakao.com/_ZxiEjG/chat">
            <div className="redyvery-linked-message-for-kakao-img">
              <img src={IMAGES.kakao_open_chat} alt="kakaolinkedicon" />
            </div>
          </Link>
        </div>

        <div className="judge-results-before-page-next-button">
          <RedButton onClick={() => navigate("/")}>확인</RedButton>
        </div>
      </div>
    </Container>
  );
}

export default JudgeResultsBeforePage;

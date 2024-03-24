import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../../../../components/login/Container/Container";
import RedButton from "../../../../components/login/redButton/RedButton";
import { IMAGES } from "../../../../constants/images";
import useRejectEntry from "../../../../hooks/useRejectEntry";
import "./JudgeResultsRejectPage.css";
function JudgeResultsRejectPage() {
  const navigate = useNavigate();
  const [is480, setIs480] = useState(window.innerWidth <= 480);
  const containerSize = is480
    ? ["25rem", "33.18rem", "5.57rem", "4.56rem"]
    //31.3+1.88 = 33.18, 3.69+1.88 =5.57
    : ["31.3rem", "34.05rem", "7.19rem", "3.5rem"];
  //31.3+2.75 = 34.05, 4.44+2.75 = 7.19
  useEffect(() => {
    const handleResize = () => {
      setIs480(window.innerWidth <= 480);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const rejectEntry = useRejectEntry();

  const handleReject = () => {
    // 심사 반려 -> 재신청
    rejectEntry();
    navigate("/signup/auth/results");
  };

  return (
    <Container
      title="심사반려"
      containerWidth={containerSize[0]}
      containerHeight={containerSize[1]}
      logoMarginTop={containerSize[2]}
      logoMarginBottom={containerSize[3]}
    >
      <div className="judge-results-reject-page-top-positon-icon-line"/>
      <div className="judge-results-reject-page-top-positon-icon-wrapper">
        <img
          src={IMAGES.store_application_bad}
          alt="deleteicon"
          className="judge-results-reject-page-top-positon-icon"
        />
      </div>
      <div className="judge-results-reject-page-content-container">
        <span className="judge-results-reject-page-content-text-style">
          심사가 반려되었습니다
        </span>
        <div className="judge-results-reject-page-content-main-text-style">
          <span>반려 사유는 회원가입 시 작성한 </span>
          <span>이메일(아이디)를 통해 확인하실 수 있습니다.</span>
        </div>

        <div className="judge-results-reject-page-next-button">
          <RedButton onClick={handleReject}>
            재신청하기
          </RedButton>
        </div>
      </div>
    </Container>
  );
}

export default JudgeResultsRejectPage;

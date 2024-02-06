import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import deleteicon from "../../../../assets/icons/icon_delete.png";
import Container from "../../../../components/login/Container/Container";
import RedButton from "../../../../components/login/redButton/RedButton";
import "./JudgeResultsRejectPage.css";
function JudgeResultsRejectPage() {
  const navigate = useNavigate();
  const [is480, setIs480] = useState(window.innerWidth <= 480);
  const containerSize = is480
    ? ["25rem", "31.3rem", "3.69rem", "4.56rem"]
    : ["31.3rem", "31.3rem", "4.44rem", "3.5rem"];
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
      title="심사반려"
      containerWidth={containerSize[0]}
      containerHeight={containerSize[1]}
      logoMarginTop={containerSize[2]}
      logoMarginBottom={containerSize[3]}
    >
      <img
        src={deleteicon}
        alt="deleteicon"
        className="judge-results-reject-page-top-positon-icon"
      />
      <div className="judge-results-reject-page-content-container">
        <span className="judge-results-reject-page-content-text-style">
          심사가 반려되었습니다
        </span>
        <div className="judge-results-reject-page-content-main-text-style">
          <span>반려 사유는 회원가입 시 작성한 </span>
          <span>이메일(아이디)를 통해 확인하실 수 있습니다.</span>
        </div>

        <div className="judge-results-reject-page-next-button">
          <RedButton onClick={() => navigate("/signup/auth/results")}>재신청하기</RedButton>
        </div>
      </div>
    </Container>
  );
}

export default JudgeResultsRejectPage;

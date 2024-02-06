import Container from "../../../../components/login/Container/Container";
import RedButton from "../../../../components/login/redButton/RedButton";
// import deleteicon from "../../../../assets/icons/icon_delete.svg"; 크기 에러, 해결 후 업로드
import { useEffect, useState } from "react";
import "./JudgeResultsRejectPage.css";
function JudgeResultsRejectPage() {
  const [is480, setIs480] = useState(window.innerWidth <= 480);
  const containerSize = is480
    ? ["20rem", "25rem", "3rem"]
    : ["25rem", "25rem", "3.52rem"];
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
      logoMarginBottom="2.9rem"
    >
      {/* <img src={deleteicon} alt="deleteicon" className="judge-results-reject-page-top-positon-icon" /> */}
      <div className="">
        <span className="judge-results-reject-page-content-text-style">
          심사가 반려되었습니다
        </span>
        <div className="judge-results-reject-page-content-main-text-style">
          <span>반려 사유는 회원가입 시 작성한 </span>
          <span>이메일(아이디)를 통해 확인하실 수 있습니다.</span>
        </div>

        <div className="judge-results-reject-page-next-button">
          <RedButton>재신청하기</RedButton>
        </div>
      </div>
    </Container>
  );
}

export default JudgeResultsRejectPage;

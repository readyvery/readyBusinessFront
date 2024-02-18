import { useEffect, useState } from "react";
import Container from "../../../components/login/Container/Container";
import CircleNumBar from "../../../components/signup/CircleNumBar/CircleNumBar";
import UserInputStoreInformation from "../../../components/signup/UserInput/UserInputStoreInformation/UserInputStoreInformation";
import "./VerificationPage.css";

function VerificationPage() {
  const [is480, setIs480] = useState(window.innerWidth <= 480);
  const containerSize = is480
    ? ["25rem", "54.8rem", "1.81rem", "1.79rem"]
    : ["37.5rem", "90.7rem", "4.69rem", "3.94rem"];

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
      title="회원가입"
      containerWidth={containerSize[0]}
      containerHeight={containerSize[1]}
      logoMarginTop={containerSize[2]}
      logoMarginBottom={containerSize[3]}
    >
      <CircleNumBar step="2" />
      <div className="signup-page-content-container1">
        <UserInputStoreInformation />
      </div>
    </Container>
  );
}

export default VerificationPage;

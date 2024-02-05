import { useEffect, useState } from "react";
import Container from "../../../components/login/Container/Container";
import CircleNumBar from "../../../components/signup/CircleNumBar/CircleNumBar";
import UserInputNumber from "../../../components/signup/UserInput/UserInputNumber/UserInputNumber";
import "./PhoneAuthPage.css";

function PhoneAuthPage() {
  // const userId = useRecoilValue(userIdState);
  // const userPassword = useRecoilValue(userPasswordState);
  // const userName = useRecoilValue(userNameState);
  // console.log(userId);
  // console.log(userPassword);
  // console.log(userName);

  const [is480, setIs480] = useState(window.innerWidth <= 480);
  const containerSize = is480
    ? ["25rem", "37.5rem", "2.56rem", "2.31rem"]
    : ["37.5rem", "50rem", "5.63rem", "3.88rem"];

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
      title="시작하기"
      containerWidth={containerSize[0]}
      containerHeight={containerSize[1]}
      logoMarginTop={containerSize[2]}
      logoMarginBottom={containerSize[3]}
    >
      <CircleNumBar step="1" />
      <div className="signup-page-content-phone-container">
        <UserInputNumber />
      </div>
    </Container>
  );
}

export default PhoneAuthPage;

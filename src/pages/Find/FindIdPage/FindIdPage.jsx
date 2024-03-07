import React, { useEffect, useState } from "react";
import CertificationInput from "../../../components/login/Certification/CertificationInput/CertificationInput";
import Container from "../../../components/login/Container/Container";

function FindIdPage() {
  const [is480, setIs480] = useState(window.innerWidth <= 480);
  const containerSize = is480
  ? ["25rem", "37.5rem", "4.13rem", "6.56rem"]
  : ["31.3rem", "37.5rem", "5.69rem","4.69rem"];

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
    <Container title={"아이디 찾기"} containerWidth={containerSize[0]} containerHeight={containerSize[1]} logoMarginTop={containerSize[2]} logoMarginBottom={containerSize[3]}>
      <CertificationInput
        id="userid"
        type="tel"
        placeholder="전화번호"
        requiredname="username"
        text="인증"
        buttonText="확인"
      />
    </Container>
  );
}

export default FindIdPage;

import React, { useEffect, useState } from "react";
import CertificationInput from "../../../components/login/Certification/CertificationInput/CertificationInput";
import Container from "../../../components/login/Container/Container";

function FindPasswordPage() {
  const [is480, setIs480] = useState(window.innerWidth <= 480);
  const containerSize = is480
    ? ["25rem", "37.5rem", "4.13rem", "6.5rem"]
    : ["31.3rem", "37.5rem", "5.56rem", "6.81rem"];
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
      title={"비밀번호 찾기"}
      containerWidth={containerSize[0]}
      containerHeight={containerSize[1]}
      logoMarginTop={containerSize[2]}
      logoMarginBottom={containerSize[3]}
    >
      <div>
        <CertificationInput
          id="userid"
          type="text"
          placeholder="아이디"
          requiredname="userid"
          text="조회"
          buttonText="다음"
        />
      </div>
    </Container>

      
  );
}
export default FindPasswordPage;

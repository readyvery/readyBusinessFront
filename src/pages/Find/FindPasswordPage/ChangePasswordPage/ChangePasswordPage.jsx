import React from "react";
import CertificationInput from "../../../../components/login/Certification/CertificationInput/CertificationInput";
import Container from "../../../../components/login/Container/Container";

function ChangePasswordPage() {
  const is480 = window.innerWidth <= 480;
  const containerSize = is480
    ? ["25rem", "37.5rem", "4.13rem", "6.5rem"]
    : ["31.3rem", "37.5rem", "5.56rem", "6.81rem"];

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
          type="tel"
          placeholder="전화번호"
          requiredname="username"
          text="인증"
          buttonText="확인"
        />
      </div>
    </Container>
  );
}
export default ChangePasswordPage;

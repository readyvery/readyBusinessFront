import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { findPasswordState } from "../../../../Atom/status";
import CertificationInputPhoneNumber from "../../../../components/login/Certification/CertificationInputPhoneNumber/CertificationInputPhoneNumber";
import Container from "../../../../components/login/Container/Container";
import "./ChangePasswordPage.css";
function ChangePasswordPage() {
  const [is480, setIs480] = useState(window.innerWidth <= 480);
  const containerSize = is480
    ? ["25rem", "40.6rem", "3.44rem", "2.31rem"]
    : ["31.3rem", "37.5rem", "3.94rem", "1.69rem"];
  useEffect(() => {
    const handleResize = () => {
      setIs480(window.innerWidth <= 480);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const passwordState = useRecoilValue(findPasswordState);
  const [userName, setUserName] = useState("");
  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };
  return (
    <Container
      title={"비밀번호 찾기"}
      containerWidth={containerSize[0]}
      containerHeight={containerSize[1]}
      logoMarginTop={containerSize[2]}
      logoMarginBottom={containerSize[3]}
    >
      <div>
        <div className="loginpage-find-password-check-phone-wrapper">
          <span className="loginpage-find-password-check-phone-title">
            전화번호 인증
          </span>
          <span className="loginpage-find-password-check-phone-number">
            ({passwordState.phoneNumber})
          </span>
          <span className="loginpage-find-password-check-phone-text">
            회원정보에 등록한 휴대전화 번호와 입력한
          </span>
          <span className="loginpage-find-password-check-phone-text">
            휴대전화 번호가 같아야, 인증번호를 받으실 수 있습니다.
          </span>
        </div>
        <input
          type="text"
          placeholder="이름"
          value={userName}
          onChange={handleUserNameChange}
          className="loginpage-find-password-check-name"
        />
        <CertificationInputPhoneNumber
          userName={userName}
          userEmail={passwordState.email}
        />
      </div>
    </Container>
  );
}
export default ChangePasswordPage;

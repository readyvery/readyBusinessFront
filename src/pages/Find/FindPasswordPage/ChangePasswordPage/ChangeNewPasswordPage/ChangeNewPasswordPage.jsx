import React, { useEffect, useState } from "react";
import Container from "../../../../../components/login/Container/Container";
import LoginChkAlrm from "../../../../../components/login/LoginChkAlrm/LoginChkAlrm";
import RedButton from "../../../../../components/login/redButton/RedButton";
import "./ChangeNewPasswordPage.css";

function ChangeNewPasswordPage() {
  const [is480, setIs480] = useState(window.innerWidth <= 480);
  const containerSize = is480
    ? ["25rem", "37.5rem", "4.13rem", "5.12rem"]
    : ["31.3rem", "37.5rem", "5.56rem", "3.38rem"];
  useEffect(() => {
    const handleResize = () => {
      setIs480(window.innerWidth <= 480);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  // 비밀번호 일치 여부 확인
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword, passwordCheck);
  };

  const handlePasswordCheckChange = (e) => {
    const newPasswordCheck = e.target.value;
    setPasswordCheck(newPasswordCheck);
    validatePassword(password, newPasswordCheck);
  };

  const isPasswordLength = (password) => {
    const minLength = 8;
    return password.length >= minLength;
  };

  const isPasswordCombinationValid = (password) => {
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return hasLetter && hasNumber && hasSpecialChar;
  };

  const validatePassword = (newPassword, newPasswordCheck) => {
    if (newPassword !== newPasswordCheck) {
      setPasswordError(true);
    } else if (!isPasswordLength(newPassword)) {
      setPasswordError(true);
    } else if (!isPasswordCombinationValid(newPassword)) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // 폼 제출 방지
  };

  return (
    <Container
      title={"비밀번호 변경"}
      containerWidth={containerSize[0]}
      containerHeight={containerSize[1]}
      logoMarginTop={containerSize[2]}
      logoMarginBottom={containerSize[3]}
    >
      <div>
        <div className="password-changepage-qualification-text">
          영문+숫자+특수문자 8자 이상
        </div>
        <form className="password-changepage-form" onSubmit={handleSubmit}>
          <input
            id="password"
            type="password"
            placeholder="새로운 비밀번호"
            required
            name="usernamepassword"
            value={password}
            onChange={handlePasswordChange}
            className="password-changepage-password-input"
          />
          <input
            id="passwordCheck"
            type="password"
            placeholder="비밀번호 확인"
            value={passwordCheck}
            onChange={handlePasswordCheckChange}
            className="password-changepage-password-input"
          />
          {/* 비밀번호 일치 여부에 따른 에러 메시지 */}
          {passwordError ? (
            <LoginChkAlrm icon={"X"} paddingSize={"0.45rem"}>
              {password !== passwordCheck
                ? "비밀번호가 일치하지 않습니다."
                : !isPasswordLength(password)
                ? "8자 이상 입력해야 합니다."
                : !isPasswordCombinationValid(password)
                ? "영문+숫자+특수문자의 조합이어야 합니다."
                : null}
            </LoginChkAlrm>
          ) : null}
          <div className="password-changepage-submit-wrapper">
            <RedButton type="submit" disabled={passwordError}>
              확인
            </RedButton>
          </div>
        </form>
      </div>
    </Container>
  );
}

export default ChangeNewPasswordPage;

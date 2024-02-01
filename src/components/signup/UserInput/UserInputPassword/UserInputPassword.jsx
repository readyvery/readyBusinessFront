import { useState } from "react";
import { useRecoilState } from "recoil";
import { userPasswordState } from "../../../../Atom/status";
import LoginChkAlrm from "../../../login/LoginChkAlrm/LoginChkAlrm";
import "./UserInputPassword.css";



const UserInputPassword = () => {
    const [password, setPassword] = useRecoilState(userPasswordState);
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
    return(  
        <div className="signup-page-content-password-wrapper">
            <label className="signup-page-content-password-label-style">비밀번호</label>
            <div className="signup-page-content-password-label-plus-text">
                영문+숫자+특수문자 8자 이상
            </div>
            <div>
                <input
                        id="password"
                        type="password"
                        placeholder="비밀번호 입력" 
                        requiredname="usernamepassword"
                        value={password}
                        onChange={handlePasswordChange}
                        className="signup-page-content-password-input"
                    />

                    <input
                        id="passwordCheck"
                        type="password"
                        placeholder="비밀번호 재입력"
                        value={passwordCheck}
                        onChange={handlePasswordCheckChange}
                        className="signup-page-content-password-input"
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
                    ) : <div style={{minHeight: "0.9rem"}}/>
                    }
            </div>
      </div>
      )
}

export default UserInputPassword;
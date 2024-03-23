import { message } from "antd";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import {
  userConfirmPasswordState,
  userIdState,
  userNameState,
  userPasswordState,
} from "../../../../Atom/status";
import RedButton from "../../../login/redButton/RedButton";
import "./UserInputNumber.css";
import UserInputNumberMessage from "./UserInputNumberMessage/UserInputNumberMessage";

function PhoneCertificationInput() {
  const navigate = useNavigate();
  const userId = useRecoilValue(userIdState);
  const userPassword = useRecoilValue(userPasswordState);
  const userConfirmPassword = useRecoilValue(userConfirmPasswordState);
  const userName = useRecoilValue(userNameState);

  const [inputNum, setInputNum] = useState(false);
  const [chkButton, setChkButton] = useState(false); // 인증버튼 클릭 여부
  const [hyphenPhonenumber, setHyphenPhonenumber] = useState(""); // 전화번호 상태
  const [verifyState, setVerifyState] = useState(false); //전화번호 인증 상태
  const apiUrl = process.env.REACT_APP_API_ROOT;

  const handleButtonClick = () => {
    const PhoneNumber = hyphenPhonenumber.replace(/\D/g, "");
    if (/^\d+$/.test(PhoneNumber) && PhoneNumber.length === 11) {
      setInputNum(true);
      handlePostmessage();
    } else {
      setInputNum(false);
      setHyphenPhonenumber("");
      message.info("전화번호를 올바르게 입력해주세요.");
    }
  };

  const handlePostmessage = async () => {
    const apiRoot = process.env.REACT_APP_API_ROOT;
    const apiVer = "api/v1";
    const apiUrl = `${apiRoot}/${apiVer}/sms/send`;
    const PhoneNumber = hyphenPhonenumber.replace(/\D/g, "");
    try {
      const response = await axios.post(`${apiUrl}`, {
        phoneNumber: PhoneNumber,
      });
      if (response.data.success) {
        setChkButton(true);
        message.success("인증 번호를 발송했습니다.");
      } else {
        console.log("인증번호 발송 실패:", response.data);
      }
    } catch (error) {
      console.error(error);
      message.error("인증 번호를 발송에 실패했습니다.");
    }
  };

  const handleJoinClick = async () => {
    const PhoneNumber = hyphenPhonenumber.replace(/\D/g, "");
    if (verifyState) {
      try {
        const response = await axios.post(`${apiUrl}/api/v1/user/join`, {
          email: userId,
          password: userPassword,
          confirmPassword: userConfirmPassword,
          name: userName,
          phone: PhoneNumber,
        });
        console.log(response);

        if (response.data.success) {
          console.log("회원가입 성공: ", response.data);
          message.info("회원가입이 완료되었습니다.");
          navigate("/login");
        } else {
          message.error(response.data.message);
          console.log("회원가입 실패: ", response.data);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      message.error("번호인증을 진행해주세요!");
    }
  };

  const handleAuthSuccess = (success) => {
    setVerifyState(success);
  };
  const renderUserInputNumberMessage = () => {
    if (chkButton && inputNum) {
      return (
        <UserInputNumberMessage
          phoneNumber={hyphenPhonenumber.replace(/\D/g, "")}
          onAuthSuccess={handleAuthSuccess}
        />
      );
    }
    return null;
  };

  const handlePhoneChange = (event) => {
    const HyphenNumber = event.target.value
      .replace(/[^0-9]/g, "")
      .replace(/(\d{3})(\d{1,4})(\d{1,4})/, "$1-$2-$3");
    setHyphenPhonenumber(HyphenNumber);
  };

  return (
    <>
      <div className="user-input-phone-number-wrapper">
        <input
          type="tel"
          inputmode="numeric"
          pattern="[0-9]*"
          placeholder="전화번호"
          value={hyphenPhonenumber}
          onChange={handlePhoneChange}
          maxLength="13"
          className="user-input-phone-number-input"
        />
        <button
          type="submit"
          onClick={handleButtonClick}
          className={`user-input-phone-number-button ${
            chkButton ? "user-input-phone-number-button-clicked" : ""
          }`}
        >
          {chkButton ? "재인증" : "조회"}
        </button>
      </div>
      {renderUserInputNumberMessage()}
      <RedButton
        type="submit"
        onClick={handleJoinClick}
        className="user-input-phone-number-auth-button"
      >
        완료
      </RedButton>
    </>
  );
}

const UserInputNumber = () => {
  return (
    <div className="user-input-phone-number-content-number-wrapper">
      <label className="user-input-phone-number-content-number-label-style">
        전화번호 인증
      </label>
      <PhoneCertificationInput />
    </div>
  );
};
export default UserInputNumber;

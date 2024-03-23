import { message } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RedButton from "../../redButton/RedButton";
import CertificationNumInput from "../CertificationNumInput/CertificationNumInput";
import "./CertificationInput.css";

// 아이디찾기 및 회원가입 번호인증에 사용
function CertificationInput({ type, buttonText }) {
  const navigate = useNavigate();
  const [inputNum, setInputNum] = useState(false); //전화번호 입력상태
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
        message.error("인증 번호를 발송에 실패했습니다.");
        console.log("아이디 찾기 인증번호 발송 실패:", response.data);
      }
    } catch (error) {
      console.error(error);
      message.error("인증 번호를 발송에 실패했습니다.");
    }
  };
  // 번호 인증 성공 여부 확인
  const handleAuthSuccess = (success) => {
    setVerifyState(success);
  };
  const renderCertificationNumInput = () => {
    if (type === "tel" && chkButton && inputNum) {
      return (
        <CertificationNumInput
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

  const handleFindIdClick = async () => {
    const PhoneNumber = hyphenPhonenumber.replace(/\D/g, "");
    try {
      const response = await axios.post(`${apiUrl}/api/v1/ceo/find/email`, {
        phoneNumber: PhoneNumber,
      });
      console.log(response);

      if (response.data.success) {
        console.log(response.data.message);
        navigate("/find/id/search", {
          state: { message: response.data.message },
        });
      }
    } catch (error) {
      // 404에러 처리(사용자 id가 db에 없을 경우)
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 404) {
          navigate("/find/id/none");
        }
      }
      // 다른 오류 처리
      else {
        message.error("아이디 조회 요청에 실패했습니다.");
      }
    }
  };

  const handleSubmitClick = () => {
    if (verifyState) {
      handleFindIdClick();
    } else {
      message.info("번호 인증을 해주세요.");
    }
  };

  return (
    <>
      <div className="loginpage-find-form-input-div">
        <input
          type="tel"
          inputmode="numeric"
          pattern="[0-9]*"
          placeholder="전화번호"
          value={hyphenPhonenumber}
          onChange={handlePhoneChange}
          maxLength="13"
          className="loginpage-findId-input"
        />
        <button
          type="submit"
          onClick={handleButtonClick}
          className={`loginpage-findId-form-submit ${
            chkButton ? "buttonClicked" : ""
          }`}
        >
          {chkButton ? "재인증" : "인증"}
        </button>
      </div>

      {renderCertificationNumInput()}
      <div className="loginpage-form-submit-button-position">
        <RedButton type="submit" onClick={handleSubmitClick}>
          {buttonText}
        </RedButton>
      </div>
    </>
  );
}

export default CertificationInput;

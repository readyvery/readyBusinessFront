import { message } from "antd";
import React, { useState } from "react";
import useFindId from "../../../../hooks/useFindId";
import useSendVerifySms from "../../../../hooks/useSendVerifySms";
import RedButton from "../../redButton/RedButton";
import CertificationNumInput from "../CertificationNumInput/CertificationNumInput";
import "./CertificationInput.css";
const TIMER_DURATION = 600; //타이머 시간 설정(600초)

// 아이디찾기 및 회원가입 번호인증에 사용
function CertificationInput({ type, buttonText }) {
  const [chkButton, setChkButton] = useState(false); // 인증버튼 클릭 여부
  const [phonenumber, setPhonenumber] = useState(""); // 전화번호 상태
  const [postmessage, setPostmessage] = useState(false); // 인증 번호 발송 성공 여부
  const [verifyState, setVerifyState] = useState(false); //전화번호 인증 상태
  const { handleSendVerifySms } = useSendVerifySms(); //번호인증
  const { findIdResult } = useFindId();
  const handleButtonClick = () => {
    // 전체가 숫자인지, 000-0000-0000 총 11자리인지 확인
    if (/^\d+$/.test(phonenumber) && phonenumber.length === 11) {
      // 11자리 입력 후에
      if (!postmessage) {
        handlePostmessage();
      } else {
        //타이머 초기화용
        setPostmessage(false);
        handlePostmessage();
      }
    } else {
      setPhonenumber("");
      message.info("전화번호를 올바르게 입력해주세요.");
    }
  };

  // 인증 문자 발신 성공 여부 확인
  const handlePostSuccess = (success) => {
    setPostmessage(success);
  };
  // 번호 인증
  const handlePostmessage = () => {
    setChkButton(true);
    handleSendVerifySms({
      userPhonenumber: phonenumber,
      onPostSuccess: handlePostSuccess,
    });
  };

  //  아이디 찾기 결과
  const handleFindIdClick = () => {
    findIdResult({ userPhonenumber: phonenumber });
  };

  // 번호 인증 성공 여부 확인
  const handleAuthSuccess = (success) => {
    setVerifyState(success);
  };
  const renderCertificationNumInput = () => {
    if (type === "tel" && chkButton && postmessage) {
      return (
        <CertificationNumInput
          phoneNumber={phonenumber}
          onAuthSuccess={handleAuthSuccess}
          initialTimer={TIMER_DURATION}
        />
      );
    }
    return null;
  };

  const handlePhoneChange = (event) => {
    const HyphenNumber = event.target.value.replace(/[^0-9]/g, "");
    setPhonenumber(HyphenNumber);
  };
  const displayFormattedPhoneNumber = (numbers) => {
    if (numbers.length <= 3) {
      return numbers;
    } else if (numbers.length <= 7) {
      return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    } else {
      return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(
        7
      )}`;
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
          value={displayFormattedPhoneNumber(phonenumber)}
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

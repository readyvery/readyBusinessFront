import { message } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSendPasswordVerifySms from "../../../../hooks/useSendPasswordVerifySms";
import RedButton from "../../redButton/RedButton";
import "../CertificationInput/CertificationInput.css";
import CertificationInputCheck from "./CertificationInputCheck";

const TIMER_DURATION = 600; //타이머 시간 설정(600초)

// 비밀번호 변경 번호 인증_번호입력
// 추후 아이디 찾기 및 회원가입 번호인증과 비교 후 수정 필요
function CertificationInputPhoneNumber(userInfo) {
  const navigate = useNavigate();
  const [chkButton, setChkButton] = useState(false); // 인증버튼 클릭 여부
  const [phonenumber, setPhonenumber] = useState(""); // 전화번호 상태
  const [postmessage, setPostmessage] = useState(false); // 인증 번호 발송 성공 여부
  const [verifyState, setVerifyState] = useState(false); //전화번호 인증 상태
  const { handleSendPasswordVerifySms } = useSendPasswordVerifySms();
  const handleButtonClick = () => {
    // 전체가 숫자인지, 000-0000-0000 총 11자리인지 확인
    if (/^\d+$/.test(phonenumber) && phonenumber.length === 11) {
      // 11자리 입력 후에
      if (!postmessage) {
        handlePostmessage();
      } else { //타이머 초기화용
        setPostmessage(false);
        handlePostmessage();
      }
    } else {
      setPhonenumber("");
      message.info("전화번호를 올바르게 입력해주세요.");
    }
  };

  const handlePostSuccess = (success) => {
    setPostmessage(success);
  };

  const handlePostmessage = () => {
    setChkButton(true);
    handleSendPasswordVerifySms({
      userPhonenumber: phonenumber,
      onPostSuccess: handlePostSuccess,
      info: userInfo,
    });
  };

  const handleAuthSuccess = (success) => {
    setVerifyState(success);
  };
  const renderCertificationNumInput = () => {
    if (postmessage) {
      return (
        <CertificationInputCheck
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
  // 전화번호 입력에 '-' 넣는 함수
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
  // 인증성공 시,
  const handleFindClick = () => {
    if (verifyState) {
      navigate("/find/password/change/user");
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
          maxLength="13"
          onChange={handlePhoneChange}
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
        <RedButton type="submit" onClick={handleFindClick}>
          다음
        </RedButton>
      </div>
    </>
  );
}

export default CertificationInputPhoneNumber;

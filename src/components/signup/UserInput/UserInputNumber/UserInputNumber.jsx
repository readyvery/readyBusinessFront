import { message } from "antd";
import { useState } from "react";
import usePhoneNumberVerificationForSignup from "../../../../hooks/usePhoneNumberVerificationForSignup";
import useSendVerifySms from "../../../../hooks/useSendVerifySms";
import RedButton from "../../../login/redButton/RedButton";
import "./UserInputNumber.css";
import UserInputNumberMessage from "./UserInputNumberMessage/UserInputNumberMessage";
const TIMER_DURATION = 600; //타이머 시간 설정(600초)

function PhoneCertificationInput() {
  const [chkButton, setChkButton] = useState(false); // 인증버튼 클릭 여부
  const [phonenumber, setPhonenumber] = useState(""); // 전화번호 상태
  const [postmessage, setPostmessage] = useState(false); // 인증 번호 발송 성공 여부
  const [verifyState, setVerifyState] = useState(false); //전화번호 인증 상태
  const { handleJoinClick } = usePhoneNumberVerificationForSignup();
  const { handleSendVerifySms } = useSendVerifySms();
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
  // 회원가입 정보 전송
  const handleSignupFormClick = () => {
    handleJoinClick({
      verifyState: verifyState,
      userPhonenumber: phonenumber,
    });
  };

  const handleAuthSuccess = (success) => {
    setVerifyState(success);
  };
  const renderUserInputNumberMessage = () => {
    if (postmessage) {
      return (
        <UserInputNumberMessage
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
  return (
    <>
      <div className="user-input-phone-number-wrapper">
        <input
          type="tel"
          inputmode="numeric"
          pattern="[0-9]*"
          placeholder="전화번호"
          value={displayFormattedPhoneNumber(phonenumber)}
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
        onClick={handleSignupFormClick}
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

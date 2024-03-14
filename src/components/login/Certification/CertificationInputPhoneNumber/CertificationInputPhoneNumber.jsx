import { message } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { findPasswordState, getPhoneNumber } from "../../../../Atom/status";
import RedButton from "../../redButton/RedButton";
import "../CertificationInput/CertificationInput.css";
import CertificationInputCheck from "./CertificationInputCheck";

// 비밀번호 변경 번호 인증_번호입력
// 추후 아이디 찾기 및 회원가입 번호인증과 비교 후 수정 필요
function CertificationInputPhoneNumber(userInfo) {
  const navigate = useNavigate();
  const [inputNum, setInputNum] = useState(false); //전화번호 입력상태
  const [chkButton, setChkButton] = useState(false); // 인증버튼 클릭 여부
  const [Phonenumber, setPhonenumber] = useState(""); // 전화번호 상태
  const [postmessage, setPostmessage] = useState(false); // 인증 번호 발송 성공 여부
  const passwordState = useRecoilValue(findPasswordState);
  const setPhoneNumberState = useSetRecoilState(getPhoneNumber);
  const handleButtonClick = () => {
    // 전체가 숫자인지, 000-0000-0000 총 11자리인지 확인
    if (/^\d+$/.test(Phonenumber) && Phonenumber.length === 11) {
      setInputNum(true);
      handlePostmessage();
    } else {
      setInputNum(false);
      setPhonenumber("");
      message.info("전화번호를 올바르게 입력해주세요.");
    }
  };
  const handlePostmessage = async () => {
    const apiRoot = process.env.REACT_APP_API_ROOT;
    const apiVer = "api/v1";
    const apiUrl = `${apiRoot}/${apiVer}/sms/send/find-email`;
    try {
      setChkButton(true);
      const response = await axios.post(`${apiUrl}`, {
        email: userInfo.userEmail,
        phoneNumber: Phonenumber,
        name: userInfo.userName,
      });
      console.log(response);

      if (response.data.success) {
        message.success("인증번호가 발송되었습니다.");
        setPhoneNumberState({
          phoneNumber: Phonenumber,
        });
        setPostmessage(true);
      } else {
        console.log("인증번호 발송 실패:", response.data);
      }
    } catch (error) {
      console.error(error);
      // 올바르지 않은 유저정보 전송 시,
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 400) {
          message.error("올바른 정보를 입력해주세요.");
        }
      }
      // 다른 오류 처리
      else {
        message.error("인증 번호 전송이 실패했습니다.");
      }
    }
  };

  const renderCertificationNumInput = () => {
    return <CertificationInputCheck phoneNumber={Phonenumber} />;
  };

  const handlePhoneChange = (event) => {
    setPhonenumber(event.target.value);
  };

  // 인증성공 시,
  const handleFindClick = () => {
    if (passwordState.verify) {
      navigate("/find/password/change/user");
    }
  };

  return (
    <>
      <div className="loginpage-find-form-input-div">
        <input
          type="tel"
          placeholder="전화번호"
          value={Phonenumber}
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

      {postmessage && inputNum && renderCertificationNumInput()}

      <div className="loginpage-form-submit-button-position">
        <RedButton type="submit" onClick={handleFindClick}>
          다음
        </RedButton>
      </div>
    </>
  );
}

export default CertificationInputPhoneNumber;

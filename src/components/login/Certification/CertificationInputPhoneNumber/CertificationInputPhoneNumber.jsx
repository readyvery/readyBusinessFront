import { message } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { findPasswordState } from "../../../../Atom/status";
import RedButton from "../../redButton/RedButton";
import "../CertificationInput/CertificationInput.css";
import CertificationNumInput from "../CertificationNumInput/CertificationNumInput";

function CertificationInputPhoneNumber(userName, userEmail) {
  const navigate = useNavigate();
  const [inputNum, setInputNum] = useState(false); //전화번호 입력상태
  const [chkButton, setChkButton] = useState(false); // 인증버튼 클릭 여부
  const [Phonenumber, setPhonenumber] = useState(""); // 전화번호 상태
  const passwordState = useRecoilValue(findPasswordState);
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
    const apiUrl = `${apiRoot}/${apiVer}/sms/send`;
    try {
      setChkButton(true);
      const response = await axios.post(`${apiUrl}`, {
        email: userEmail,
        phoneNumber: Phonenumber,
        name: userName,
      });
      console.log(response);

      if (response.data.success) {
        console.log("인증번호 발송 성공:", response.data);
      } else {
        console.log("인증번호 발송 실패:", response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const renderCertificationNumInput = () => {
    return <CertificationNumInput phoneNumber={Phonenumber} />;
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

      {inputNum && renderCertificationNumInput()}

      <div className="loginpage-form-submit-button-position">
        <RedButton type="submit" onClick={handleFindClick}>
          다음
        </RedButton>
      </div>
    </>
  );
}

export default CertificationInputPhoneNumber;

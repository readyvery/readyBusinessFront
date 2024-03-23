import { message } from "antd";
import axios from "axios";
import React, { useState } from "react";
import RedButton from "../../redButton/RedButton";
import CertificationNumInput from "../CertificationNumInput/CertificationNumInput";
import "./CertificationInput.css";

function CertificationInput({
  id,
  type,
  placeholder,
  requiredname,
  text,
  buttonText,
}) {
  const [inputNum, setInputNum] = useState(false); //전화번호 입력상태
  const [chkButton, setChkButton] = useState(false); // 인증버튼 클릭 여부
  const [Phonenumber, setPhonenumber] = useState(""); // 전화번호 상태
  const apiUrl = process.env.REACT_APP_API_ROOT;

  const handleButtonClick = () => {
    if (/^\d+$/.test(Phonenumber) && Phonenumber.length === 11) {
      setInputNum(true);
      handlePostmessage();
    } else {
      setInputNum(false);
      message.info("전화번호를 올바르게 입력해주세요.");
    }
  };
  const handlePostmessage = async () => {
    // 전체가 숫자인지, 000-0000-0000 총 11자리인지 확인
    try {
      setChkButton(true);
      const response = await axios.post(
        `${apiUrl}/api/v1/sms/send`,
        {
          phoneNumber: Phonenumber,
        },
        { withCredentials: true }
      );
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
    if (type === "tel" && chkButton && inputNum) {
      return <CertificationNumInput phoneNumber={Phonenumber} />;
    }
    return null;
  };

  const handlePhoneChange = (event) => {
    setPhonenumber(event.target.value);
  };

  return (
    <>
      <div className="loginpage-find-form-input-div">
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          requiredname={requiredname}
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
          {text === "인증" ? (chkButton ? "재인증" : text) : "조회"}
        </button>
      </div>

      <form>
        {renderCertificationNumInput()}
        <div className="loginpage-form-submit-button-position">
          <RedButton type="submit" onSubmit={(e) => e.preventDefault()}>
            {buttonText}
          </RedButton>
        </div>
      </form>
    </>
  );
}

export default CertificationInput;

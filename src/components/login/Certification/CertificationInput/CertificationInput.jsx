import { message } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
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
        }
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
      console.log('번호 verify')
      return <CertificationNumInput phoneNumber={Phonenumber} />;
    }
    return null;
  };

  const handlePhoneChange = (event) => {
    setPhonenumber(event.target.value);
  };

  const handleFindIdClick = async () => {
    try {
      const response = await axios.post(`${apiUrl}/api/v1/ceo/find/email`, {
        phoneNumber: Phonenumber,
      })
      console.log(response);

      if (response.data.success) {
        console.log(response.data.message);
        navigate('/find/id/search');
      } else {
        console.log('아이디찾기 실패' + response.data)
        navigate('/find/id/none');
      }
    } catch (error) {
      console.log(error);
    }
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

      
        {renderCertificationNumInput()}
        <div className="loginpage-form-submit-button-position">
          <RedButton type="submit" onClick={handleFindIdClick}>
            {buttonText}
          </RedButton>
        </div>
    </>
  );
}

export default CertificationInput;
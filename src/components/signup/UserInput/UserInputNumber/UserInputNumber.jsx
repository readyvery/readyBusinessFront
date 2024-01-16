import "./UserInputNumber.css";
import { useState } from "react";
import UserInputNumberMessage from "./UserInputNumberMessage/UserInputNumberMessage";
import RedButton from "../../../login/redButton/RedButton";

function PhoneCertificationInput({ id, type, placeholder, requiredname, text, buttonText }) {
  const [chkButton, setChkButton] = useState(false); // 인증버튼 클릭 여부

  const handleButtonClick = () => {
    setChkButton(true);
  };

  const renderUserInputNumberMessage = () => {
    if (type === "tel" && chkButton) {
      return <UserInputNumberMessage />;
    }
    return null;
  };

  return (
    <>
      <div className="user-input-phone-number-wrapper">
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          requiredname={requiredname}
          className="user-input-phone-number-input"
        />
        <button
          type="submit"
          onClick={handleButtonClick}
          className={`user-input-phone-number-button ${chkButton ? "user-input-phone-number-button-clicked" : ""}`}
        >
          {text === "인증" ? (chkButton ? "재인증" : text) : "조회"}
        </button>
      </div>
      {renderUserInputNumberMessage()}
      <div className="user-input-phone-number-auth-button">
        <RedButton>{buttonText}</RedButton>
      </div>
    </>
  );
}


const UserInputNumber = () => {

    return(
        <div className="user-input-phone-number-content-number-wrapper">
            <label className="user-input-phone-number-content-number-label-style">전화번호 인증</label>
            <PhoneCertificationInput 
                id="userid" 
                type="tel"
                placeholder="전화번호"
                requiredname="username"
                text="인증"
                buttonText="완료"
            />
        </div>
    )
}
export default UserInputNumber;
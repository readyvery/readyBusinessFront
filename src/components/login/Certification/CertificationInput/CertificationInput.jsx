import React, { useState } from "react";
import RedButton from "../../redButton/RedButton";
import "./CertificationInput.css";
import CertificationNumInput from "../CertificationNumInput/CertificationNumInput";
// import { Link } from "react-router-dom";

function CertificationInput({ id, type, placeholder, requiredname, text, buttonText }) {
  const [chkButton, setChkButton] = useState(false); // 인증버튼 클릭 여부

  const handleButtonClick = () => {
    setChkButton(true);
  };

  const renderCertificationNumInput = () => {
    if (type === "tel" && chkButton) {
      return <CertificationNumInput />;
    }
    return null;
  };

  return (
    <>
      <div className="loginpage-find-form-input-div">
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          requiredname={requiredname}
          className="loginpage-findId-input"
        />
        <button
          type="submit"
          onClick={handleButtonClick}
          className={`loginpage-findId-form-submit ${chkButton ? "buttonClicked" : ""}`}
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

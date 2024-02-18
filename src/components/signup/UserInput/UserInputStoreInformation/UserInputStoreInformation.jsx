import { message } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RedButton from "../../../login/redButton/RedButton";
import "./UserInputStoreInformation.css";
import CheckConsentForm from "./UserInputStoreInformationInputComponents/CheckConsentForm";
import InputStoreAddress from "./UserInputStoreInformationInputComponents/InputStoreAddress";
import InputStoreInformationText from "./UserInputStoreInformationInputComponents/InputStoreInformationText";
import InputStoreInformationflie from "./UserInputStoreInformationInputComponents/InputStoreInformationflie";

const UserInputStoreInformation = () => {
  const navigate = useNavigate();
  const [storeName, setStoreName] = useState("");
  const [zonecode, setZonecode] = useState("");
  const [zoneAddress, setZoneAddress] = useState("");
  const [zoneAddressDetail, setZoneAddressDetail] = useState("");
  const [storeBusinessNumber, setStoreBusinessNumber] = useState("");
  const [storeBusinessRegistration, setStoreBusinessRegistration] =
    useState(null);
  const [storeBusinessLicense, setStoreBusinessLicense] = useState(null);
  const [userIdentification, setUserIdentification] = useState(null);
  const [userPassbook, setUserPassbook] = useState(null);
  const [personalInfoConsent, setPersonalInfoConsent] = useState(false);

  const handleStoreNameChange = (event) => {
    setStoreName(event.target.value);
  };

  const handleZonecodeChange = (zonecode) => {
    setZonecode(zonecode);
  };

  const handleZoneAddressChange = (zoneAddress) => {
    setZoneAddress(zoneAddress);
  };
  const handleZoneAddressDetailChange = (zoneAddressDetail) => {
    setZoneAddressDetail(zoneAddressDetail);
  };

  const handleStoreBusinessNumberChange = (event) => {
    setStoreBusinessNumber(event.target.value);
  };

  const checkInputsCompletion = () => {
    const isComplete =
      storeName &&
      zonecode &&
      zoneAddress &&
      zoneAddressDetail &&
      storeBusinessNumber &&
      storeBusinessRegistration &&
      storeBusinessLicense &&
      userIdentification &&
      userPassbook &&
      personalInfoConsent;

    return isComplete;
  };

  const handlePersonalInfoConsentChange = () => {
    setPersonalInfoConsent((prev) => !prev);
  };

  const handleSubmission = () => {
    const isComplete = checkInputsCompletion();

    if (isComplete) {
      message.success("입력이 완료되었습니다.");
      // 여기서 try..
      navigate("/signup/auth/results/before");
    } else {
      message.error("필수 입력 항목을 모두 입력하세요.");
    }
  };
  return (
    <div>
      <InputStoreInformationText
        title="상호명"
        id="storename"
        placeholder="상호명 입력"
        requiredname="storename"
        onChange={handleStoreNameChange}
      />
      <InputStoreAddress
        onZonecodeChange={handleZonecodeChange}
        onZoneAddressChange={handleZoneAddressChange}
        onZoneAddressDetailChange={handleZoneAddressDetailChange}
      />
      <InputStoreInformationText
        title="사업자 번호"
        id="storebusinessnumber"
        placeholder="사업자 번호 입력"
        requiredname="storebusinessnumber"
        onChange={handleStoreBusinessNumberChange}
      />
      <InputStoreInformationflie
        title="사업자 등록증 (파일첨부)"
        id="storebusinessregistration"
        requiredname="storebusinessregistration"
        onChange={(file) => {
          setStoreBusinessRegistration(file);
        }}
      />
      <InputStoreInformationflie
        title="영업 신고증 (파일 첨부)"
        id="storebusinesslicense"
        requiredname="storebusinesslicense"
        onChange={(file) => {
          setStoreBusinessLicense(file);
        }}
      />
      <InputStoreInformationflie
        title="신분증 (파일 첨부)"
        id="useridentification"
        requiredname="useridentification"
        onChange={(file) => {
          setUserIdentification(file);
        }}
      />
      <InputStoreInformationflie
        title="통장 사본"
        id="userpassbook"
        requiredname="userpassbook"
        onChange={(file) => {
          setUserPassbook(file);
        }}
      />
      <CheckConsentForm
        personalInfoConsent={personalInfoConsent}
        onPersonalInfoConsentChange={handlePersonalInfoConsentChange}
      />
      <RedButton
        className="signup-page-verification-next-button"
        onClick={handleSubmission}
      >
        승인요청 신청
      </RedButton>
    </div>
  );
};

export default UserInputStoreInformation;

import React, { useState } from "react";
import { Modal } from "antd";
import "./UserInputStoreInformation";
import DaumPostcode from "react-daum-postcode";

const InputStoreInformationText = ({ title, id, placeholder, requiredname }) => {
  return (
    <div className="signup-page-content-id-wrapper">
      <label className="signup-page-content-id-label-style">{title}</label>
      <div>
        <input
          id={id}
          type="text"
          placeholder={placeholder}
          required
          name={requiredname}
          className="signup-page-content-id-input"
        />
      </div>
    </div>
  );
};

const InputStoreAddressWrapper = () => {
  const [postAddress, setPostAddress] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const handleComplete = (data) => {
    setPostAddress(data.address);
    onOpenPostModal();
  };

  const onOpenPostModal = () => {
    setOpenModal((prev) => !prev);
  };

  return (
    <div className="signup-page-content-id-wrapper">
      <label className="signup-page-content-id-label-style">매장주소</label>
      <div>
        <input
          id="storepostaddress"
          type="text"
          placeholder="우편번호"
          required
          name="storepostaddress"
          className="signup-page-content-id-input"
          value={postAddress}
          onClick={onOpenPostModal}
        />
        {openModal && (
          <Modal
            open={true}
            onOk={onOpenPostModal}
            onCancel={onOpenPostModal}
            destroyOnClose={true}
          >
            <DaumPostcode onComplete={handleComplete} />
          </Modal>
        )}
        <input
          id="storeaddress"
          type="text"
          placeholder="매장 주소 입력"
          required
          name="storeaddress"
          className="signup-page-content-id-input"
        />
        <input
          id="storeaddressdetail"
          type="text"
          placeholder="(필수) 상세 주소 입력"
          required
          name="storeaddressdetail"
          className="signup-page-content-id-input"
        />
      </div>
    </div>
  );
};

const InputStoreInformationflie = ({ title, id, requiredname }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileSizeError, setFileSizeError] = useState(false);
  if(fileSizeError){
    console.log("사진 크기에러")
  }
  const InputFilesss = () => {
    const handleFileChange = (event) => {
      const file = event.target.files[0];

      if (file && file.size <= 10 * 1024 * 1024) {
        setSelectedFile(file);
        setFileSizeError(false);
      } else {
        setFileSizeError(true);
        setSelectedFile(null);
      }
    };

    return (
      <input
        id={id}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    );
  };

  return (
    <div className="signup-page-content-id-wrapper">
      <label className="signup-page-content-id-label-style">{title}</label>
      <div>
        <InputFilesss />
        <input
          id={id}
          type="text"
          placeholder="파일을 마우스로 끌어오세요"
          defaultValue={selectedFile ? selectedFile.name : ""}
          readOnly
          onClick={() => {
            const inputFile = document.getElementById(id);
            if (inputFile) {
              inputFile.click();
            }
          }}
          className="signup-page-content-id-input"
        />
      </div>
    </div>
  );
};

const ConsentForm = () => {
  const [personalInfoConsent, setPersonalInfoConsent] = useState(false);

  const handlePersonalInfoConsentChange = () => {
    setPersonalInfoConsent((prev) => !prev);
  };

  return (
    <div>
      {/* 약관 나오면 입히기 */}
      <label htmlFor="personalInfoConsent">개인정보 수집 및 이용 동의(필수) </label>
      <input
        type="checkbox"
        id="personalInfoConsent"
        checked={personalInfoConsent}
        onChange={handlePersonalInfoConsentChange}
      />
    </div>
  );
};

const UserInputStoreInformation = () => {
  return (
    <div>
      <InputStoreInformationText
        title="상호명"
        id="storename"
        placeholder="상호명 입력"
        requiredname="storename"
      />
      <InputStoreAddressWrapper />
      <InputStoreInformationText
        title="사업자 번호"
        id="storebusinessnumber"
        placeholder="사업자 번호 입력"
        requiredname="storebusinessnumber"
      />
      <InputStoreInformationflie
        title="사업자 등록증 (파일첨부)"
        id="storebusinessregistration"
        requiredname="storebusinessregistration"
      />
      <InputStoreInformationflie
        title="영업 신고증 (파일 첨부)"
        id="storebusinesslicense"
        requiredname="storebusinesslicense"
      />
      <InputStoreInformationflie
        title="신분증 (파일 첨부)"
        id="useridentification"
        requiredname="useridentification"
      />
      <InputStoreInformationflie
        title="통장 사본"
        id="userpassbook"
        requiredname="userpassbook"
      />
      <ConsentForm />
    </div>
  );
};

export default UserInputStoreInformation;

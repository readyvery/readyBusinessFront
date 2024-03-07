import { Modal } from "antd";
import { useState } from "react";
import DaumPostcode from "react-daum-postcode";

const InputStoreAddress = ({
  onZonecodeChange,
  onZoneAddressChange,
  onZoneAddressDetailChange,
}) => {
  const [zonecode, setZonecode] = useState("");
  const [zoneAddress, setZoneAddress] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const handleComplete = (data) => {
    setZonecode(data.zonecode);
    setZoneAddress(data.address);
    onZonecodeChange(data.zonecode); // onZonecodeChange 함수를 호출하여 값 전달
    onZoneAddressChange(data.address); // onZoneAddressChange 함수를 호출하여 값 전달
    onOpenPostModal();
  };

  const onOpenPostModal = () => {
    setOpenModal((prev) => !prev);
  };

  return (
    <div className="signup-page-content-store-wrapper">
      <label className="signup-page-content-store-label-style">매장주소</label>
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
      <div onClick={onOpenPostModal}>
        <div className="signup-page-content-store-input-top-wrapper">
          <input
            id="storezonecode"
            type="text"
            placeholder="우편번호"
            required
            name="storezonecode"
            className="signup-page-content-store-input-top"
            value={zonecode}
            onChange={onZonecodeChange}
          />
          <button className="signup-page-content-store-input-top-button">
            조회
          </button>
        </div>
        <input
          id="storeaddress"
          type="text"
          placeholder="매장 주소 입력"
          required
          name="storeaddress"
          value={zoneAddress}
          onChange={onZoneAddressChange}
          className="signup-page-content-store-input"
        />
      </div>
      <div className="signup-page-content-store-input-margin" />
      <input
        id="storeaddressdetail"
        type="text"
        placeholder="(필수) 상세 주소 입력"
        required
        name="storeaddressdetail"
        className="signup-page-content-store-input"
        onChange={(e) => onZoneAddressDetailChange(e.target.value)}
      />
    </div>
  );
};
export default InputStoreAddress;

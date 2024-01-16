import "./TermsPage.css";
import RedButton from "../../../components/login/redButton/RedButton";
import Container from "../../../components/login/Container/Container";
import { useState } from "react";

function TermsPage() {
  const [consents, setConsents] = useState({
    itemall: false,
    item1: false,
    item2: false,
    item3: false,
    item4: false,
  });

  const handleConsentChange = (id) => {
    setConsents((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleAllConsentsChange = () => {
    setConsents((prev) => {
      const allChecked = !prev.itemall;

      return {
        itemall: allChecked,
        item1: allChecked,
        item2: allChecked,
        item3: allChecked,
        item4: allChecked,
      };
    });
  };

  if (consents.item1 && consents.item2 && consents.item3 && consents.item4) {
    consents.itemall = true;
  } else {
    consents.itemall = false;
  }

  const ConsentForm = ({ title, id }) => {
    const isChecked = consents[id];

    const handleCheckboxChange = () => {
      handleConsentChange(id);
    };

    const isAllItem = id === "itemall";
    const labelClassName = isAllItem
      ? "terms-page-check-box-font-style-1"
      : "terms-page-check-box-font-style-2";

    const handleCheckboxAllChange = isAllItem
      ? handleAllConsentsChange
      : handleCheckboxChange;

    return (
      <div className={`terms-page-check-box-wrapper ${labelClassName}`}>
        <div className="terms-page-check-box-wrapper-inner">
          {/* 약관 나오면 입히기 */}
          <label htmlFor={id} className="terms-page-check-box-wrapper-label">
            {title}
          </label>
          <input
            type="checkbox"
            id={id}
            checked={isChecked}
            onChange={handleCheckboxAllChange}
            className="terms-page-check-box-wrapper-input"
          />
        </div>
      </div>
    );
  };

  return (
    <Container
      title="이용약관동의"
      containerWidth="25rem"
      containerHeight="40rem"
      logoMarginTop="3.8rem"
      logoMarginBottom="2.7rem"
    >
      <div className="terms-page-container">
        <ConsentForm id="itemall" title="모든 이용약관에 동의합니다." />
        <ConsentForm id="item1" title="서비스 이용약관 동의(필수)" />
        <ConsentForm id="item2" title="개인정보 수집 및 이용 동의 (필수)" />
        <ConsentForm id="item3" title="사이트 이용약관 동의 (필수)" />
        <ConsentForm id="item4" title="전자금융거래 이용약관 동의 (필수)" />
        <div className="terms-page-next-button">
          <RedButton>확인</RedButton>
        </div>
      </div>
    </Container>
  );
}

export default TermsPage;

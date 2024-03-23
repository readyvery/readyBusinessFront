import { message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../../../components/login/Container/Container";
import RedButton from "../../../components/login/redButton/RedButton";
import "./TermsPage.css";

function TermsPage() {
  const navigate = useNavigate();
  const [is480, setIs480] = useState(window.innerWidth <= 480);
  const containerSize = is480
    ? ["25rem", "37.5rem", "3rem", "3.13rem"]
    : ["31.3rem", "50rem", "4.69rem", "3.56rem"];
  useEffect(() => {
    const handleResize = () => {
      setIs480(window.innerWidth <= 480);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  // 이용약관 상태관리
  const [consents, setConsents] = useState({
    itemAll: false,
    item1: false,
    item2: false,
    item3: false,
    item4: false,
  });

  const handleSubmission = () => {
    const isComplete = consents.itemAll;
    if (isComplete) {
      navigate("/signup");
    } else {
      message.error("필수 동의항목을 모두 체크해주세요.");
    }
  };
  // 이용약관 개별 동의 핸들러
  const handleConsentChange = (id) => {
    setConsents((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  // 이용약관 모두 동의 핸들러
  const handleAllConsentsChange = () => {
    setConsents((prev) => {
      const allChecked = !prev.itemAll;

      return {
        itemAll: allChecked,
        item1: allChecked,
        item2: allChecked,
        item3: allChecked,
        item4: allChecked,
      };
    });
  };

  // 이용약관이 모두 동의된다면, 모두 동의도 체크되게
  if (consents.item1 && consents.item2 && consents.item3 && consents.item4) {
    consents.itemAll = true;
  } else {
    consents.itemAll = false;
  }

  // 이용약관 동의 체크박스 컴포넌트
  const ConsentForm = ({ title, id, link }) => {
    const isChecked = consents[id];

    const handleCheckboxChange = () => {
      handleConsentChange(id);
    };

    const handleLinkClick = () => {
      handleConsentChange(id);
    }

    const isAllItem = id === "itemAll";
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
            <a href={link} onClick={handleLinkClick} target="_blank" rel="noopener noreferrer">
            {title}
            </a>
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
      containerWidth={containerSize[0]}
      containerHeight={containerSize[1]}
      logoMarginTop={containerSize[2]}
      logoMarginBottom={containerSize[3]}
    >
      <div className="terms-page-container">
        <ConsentForm id="itemAll" title="모든 이용약관에 동의합니다." />
        <ConsentForm id="item1" title="서비스 이용약관 동의(필수)" link="https://readyberry.notion.site/b68ddd36b1b0429089a6e12cffcdc876"/>
        <ConsentForm id="item2" title="개인정보 수집 및 이용 동의 (필수)" link="https://readyberry.notion.site/1ee0f5fd9c3f45778883f30119409c64"/>
        <ConsentForm id="item3" title="사이트 이용약관 동의 (필수)" link="https://readyberry.notion.site/292eb070d30f4330a64ea3d52f67a62e"/>
        <ConsentForm id="item4" title="전자금융거래 이용약관 동의 (필수)" link="https://readyberry.notion.site/4223ec2f072743088fec3f8e607b8d3b"/>
        <div className="terms-page-next-button">
          <RedButton onClick={handleSubmission}>확인</RedButton>
        </div>
      </div>
    </Container>
  );
}

export default TermsPage;

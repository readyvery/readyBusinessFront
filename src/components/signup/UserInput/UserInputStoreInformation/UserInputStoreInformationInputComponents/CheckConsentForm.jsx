const CheckConsentForm = ({
  personalInfoConsent,
  onPersonalInfoConsentChange,
}) => {
  return (
    <div className="signup-page-content-store-check">
      {/* 약관 나오면 입히기 */}
      <label htmlFor="personalInfoConsent">
        개인정보 수집 및 이용 동의(필수){" "}
      </label>
      <input
        type="checkbox"
        id="personalInfoConsent"
        checked={personalInfoConsent}
        onChange={onPersonalInfoConsentChange}
      />
    </div>
  );
};

export default CheckConsentForm;

import icon_parkOutline from "../../../../../assets/icons/icon_parkOutline.svg";
import "./HeaderBackButton480.css";

const HeaderBackButton480 = () => {
  // 접속 기록 상의 뒤
  // 일정 페이지로의 이동을 바랄 경우 수정필요
  const handleGoBack = () => {
    window.history.back();
  };
  return (
    <div className="header-top-back-button-style">
      <img
        src={icon_parkOutline}
        alt="parkOutline"
        onClick={() => handleGoBack()}
      />
    </div>
  );
};
export default HeaderBackButton480;

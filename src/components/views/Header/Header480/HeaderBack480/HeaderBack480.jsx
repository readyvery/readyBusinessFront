import back from "../../../../../assets/icons/icon_parkOutline.svg";
import "./HeaderBack480.css";

const HeaderBack480 = ({ pageName }) => {
  // 접속 기록 상의 뒤
  // 일정 페이지로의 이동을 바랄 경우 수정필요
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <header className="header__back__480">
      <img src={back} alt="<" onClick={() => handleGoBack()} />
      {/* 페이지 이름 표시 */}
      <span>{pageName}</span>
    </header>
  );
};
export default HeaderBack480;

import back from "../../../../../assets/icons/icon_parkOutline.svg";
import "./HeaderBack480.css";

const HeaderBack480 = ({ pageName }) => {
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

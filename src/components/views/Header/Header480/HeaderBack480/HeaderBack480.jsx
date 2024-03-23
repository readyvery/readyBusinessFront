import { IMAGES } from "../../../../../constants/images";
import "./HeaderBack480.css";

const HeaderBack480 = ({ pageName }) => {
  const handleGoBack = () => {
    window.history.back();
  };

  //TODO:: 백버튼 마진 수정
  return (
    <header className="header__back__480">
      <img src={IMAGES.back} alt="<" onClick={() => handleGoBack()} />
      {/* 페이지 이름 표시 */}
      <span>{pageName}</span>
    </header>
  );
};
export default HeaderBack480;

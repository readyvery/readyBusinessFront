// import logo from "../../assets/icons/Big_LOGO.svg";
// import kakao from "../../assets/icons/img_kakao.png";
import ResponsiveHeader from "../../components/views/Header/ResponsiveHeader";
import "./MainPage.css";

function MainPage() {
  // const handleKakaoLogin = () => {
  //     console.log(process.env.REACT_APP_KAKAO_LOGIN);
  //     window.location.href = `${process.env.REACT_APP_KAKAO_LOGIN}`;
  // };

  // return(
  //     <div className="mainpage-wrapper">
  //         <span><img src={logo} alt="logo"/></span>
  //         <div onClick={handleKakaoLogin}><img src={kakao} alt="kakao" style={{ 'width': '37.5rem', 'height': '5.625rem'}}/></div>

  //     </div>
  // )
  return (
    <div className="main">
      <ResponsiveHeader />
    </div>
  );
}

export default MainPage;

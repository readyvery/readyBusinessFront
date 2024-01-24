import { useNavigate } from "react-router-dom";
import logo_txt from "../../../../assets/icons/Big_LOGO.svg";
import logo_cherry from "../../../../assets/icons/small_cherry.svg"
import "./HeaderMain.css";
import { useState } from "react";
const HeaderMain = () =>{
    const navigate = useNavigate();
    const [isOperation, setIsOperation] = useState(false);//가게 영업 상태를 받아와야합니다.
    //영업중/영업종료를 바꿔주는 핸들러
    //해당 로직 필요함
    const handleOperation = () => {
        setIsOperation((prev) => !prev);
    };
    const isOperationBackground = isOperation
    ? "rgba(216, 35, 86, 1)"
    : "rgba(131, 131, 131, 1)";

    const OperationButton = () => {
        return (
          <div className="loginControl-wrapper-css">
            <span>{isOperation ? "영업 중" : "영업 종료"}</span>
            <div 
                className="loginControl-button-wrapper-css" 
                onClick={() => handleOperation()}
                style={{ backgroundColor: isOperationBackground }}
                >
              {isOperation ? (
                <div className="loginControl-button-isopen-css"></div>
              ) : (
                <div className="loginControl-button-isclose-css"></div>
              )}
            </div>
          </div>
        );
      };
      

    return(
        <header className="header-css">
            <div className="headerTop-css">
                <div className="headerTop-logo-wrapper-css" onClick={() => navigate("/")}>
                    <img src={logo_cherry} alt="logo_cherry" className="headerTop-logo-cherry-css"/>
                    <img src={logo_txt} alt="logoicon" className="headerTop-logo-txt-css"/>
                </div>

                <div className="headerTop-nav-css">
                    <ul className="headerTop-nav-right-css" >
                        <li onClick={() => navigate("/")}>
                            공지사항
                        </li>
                        <li onClick={() => navigate("/")}>
                            고객센터
                        </li>
                        <li onClick={() => navigate("/mypage")}>
                            마이페이지
                        </li>
                    </ul>
                </div>
            </div>
            <div className="headerBottom-css">
                <div className="headerBottom-nav-css">
                    <ul className="headerBottom-nav-left-css" >
                        {/*경로 입력해주세요!  */}
                        <li onClick={() => navigate("/")}>
                            매출관리
                        </li>
                        <li onClick={() => navigate("/")}>
                            매장관리
                        </li>
                        <li onClick={() => navigate("/mypage")}>
                            재고관리
                        </li>
                        {/* 클릭안되게. */}
                        <li >
                        {/* <li onClick={() => navigate("/")}> */}
                            고객관리(준비중)
                        </li>
                    </ul>
                </div>
                <OperationButton/>
            </div>
        </header>
    )
}
export default HeaderMain;

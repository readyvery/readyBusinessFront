import { useNavigate } from "react-router-dom";
import logo_txt from "../../../../assets/icons/Big_LOGO.svg";
import logo_cherry from "../../../../assets/icons/small_cherry.svg";
import OperationButton from "../OperationButton/OperationButton";
import "./HeaderMain.css";
const HeaderMain = () => {
  const navigate = useNavigate();

  return (
    <header className="header-css">
      <div className="headerTop-wrapper-css">
        <div className="headerTop-css">
          <div
            className="headerTop-logo-wrapper-css"
            onClick={() => navigate("/")}
          >
            <img
              src={logo_cherry}
              alt="logo_cherry"
              className="headerTop-logo-cherry-css"
            />
            <img
              src={logo_txt}
              alt="logoicon"
              className="headerTop-logo-txt-css"
            />
          </div>

          <div className="headerTop-nav-css">
            <ul className="headerTop-nav-right-css">
              <li onClick={() => navigate("/")}>공지사항</li>
              <span className="headerTop-nav-line"></span>
              <li onClick={() => navigate("/")}>고객센터</li>
              <span className="headerTop-nav-line"></span>
              <li onClick={() => navigate("/mypage")}>마이페이지</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="headerBottom-wrapper-css">
        <div className="headerTop-css">
          <div className="headerBottom-nav-css">
            <ul className="headerBottom-nav-left-css">
              {/*경로 입력해주세요!  */}
              <li onClick={() => navigate("/")}>매출관리</li>
              <li onClick={() => navigate("/")}>매장관리</li>
              <li onClick={() => navigate("/mypage")}>재고관리</li>
              {/* 클릭안되게. */}
              <li>
                {/* <li onClick={() => navigate("/")}> */}
                고객관리(준비중)
              </li>
            </ul>
          </div>
          <div style={{marginLeft:"auto"}}>
          <OperationButton />
          </div>
        </div>
      </div>
    </header>
  );
};
export default HeaderMain;

import { Link, useNavigate } from "react-router-dom";
import { IMAGES } from "../../../../constants/images";
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
            onClick={() => navigate(`/main`)}
          >
            <img
              src={IMAGES.cherry_red}
              alt="logo_cherry"
              className="headerTop-logo-cherry-css"
            />
            <img
              src={IMAGES.logo}
              alt="logoicon"
              className="headerTop-logo-txt-css"
            />
          </div>

          <div className="headerTop-nav-css">
            <ul className="headerTop-nav-right-css">
              <li>공지사항</li>
              <span className="headerTop-nav-line"></span>
              <Link
                to="http://pf.kakao.com/_ZxiEjG/chat"
                style={{ textDecoration: "none", color: "#838383" }}
              >
                <li>고객센터</li>
              </Link>
              <span className="headerTop-nav-line"></span>
              <li onClick={() => navigate(`/mypage`)}>마이페이지</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="headerBottom-wrapper-css">
        <div className="headerTop-css">
          <div className="headerBottom-nav-css">
            <ul className="headerBottom-nav-left-css">
              <li onClick={() => navigate(`/sales`)}>매출관리</li>
              <li onClick={() => navigate(`/store`)}>매장관리</li>
              <li onClick={() => navigate(`/inventory`)}>재고관리</li>
              {/* 클릭안되게. */}
              <li>
                {/* <li onClick={() => navigate("/")}> */}
                고객관리(준비중)
              </li>
            </ul>
          </div>

          <div style={{ marginLeft: "auto" }}>
            <OperationButton />
          </div>
        </div>
      </div>
    </header>
  );
};
export default HeaderMain;

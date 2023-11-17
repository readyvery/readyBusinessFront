import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { storeState } from "../../../Atom/status";
import StoreOff from "../../../assets/icons/Header/CloseLight.svg"; //영업종료
import LOGO from "../../../assets/icons/Header/LOGO.svg"; //로고
import StoreOn from "../../../assets/icons/Header/OpenLight.svg"; //영업중
import SoundOff from "../../../assets/icons/Header/SoundOff.svg"; //소리끔
import SoundOn from "../../../assets/icons/Header/SoundOn.svg"; //소리켬
import "./Header.css";

const Header = () => {
  const Store = useRecoilValue(storeState);
  const [Sound, setSound] = useState(1);

  const onClickHandler = (e) => {
    setSound(!Sound);
  };

  return (
    <div className="header2">
      <div className="header2-wrapper">
        <div>
          <img src={LOGO} className="LOGO" alt="LOGO" />
        </div>
        <div className="head-container2">
          {!Store ? (
            <div className="store-group">
              <div className="store-img__wrapper"><img src={StoreOn} alt="Open" /></div>
              <div className="header-font">영업중</div>
            </div>
          ) : (
            <div className="store-group">
              <div className="store-img__wrapper"><img src={StoreOff} alt="Close" /></div>
              <div className="header-font">영업종료 </div>
            </div>
          )}
          {Sound ? (
            <div className="header-img-wrapper">
                <img src={SoundOn} onClick={onClickHandler} alt="SoundOn" />
            </div>
          ) : (
            <div className="header-img-wrapper">
                <img src={SoundOff} onClick={onClickHandler} alt="SoundOff" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;

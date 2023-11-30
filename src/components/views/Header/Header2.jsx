import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { soundState } from "../../../Atom/status";
import StoreOff from "../../../assets/icons/Header/CloseLight.svg"; //영업종료
import LOGO from "../../../assets/icons/Header/LOGO.svg"; //로고
import StoreOn from "../../../assets/icons/Header/OpenLight.svg"; //영업중
import SoundOff from "../../../assets/icons/Header/SoundOff.svg"; //소리끔
import SoundOn from "../../../assets/icons/Header/SoundOn.svg"; //소리켬
import "./Header.css";

const Header = () => {
  const baseUrl = process.env.REACT_APP_API_ROOT;
  // const Store = useRecoilValue(storeState);
  const [store, setStore] = useState(null);
  useEffect(() => {
    const config = {
      withCredentials: true,
    };

    axios
      .get(`${baseUrl}/api/v1/store/sales`, config)
      .then((res) => {
        console.log(res);
        setStore(res.data.status);
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [Sound, setSound] = useRecoilState(soundState);

  const onClickHandler = () => {
    setSound((prev) => !prev);
    console.log(Sound);
  };

  return (
    <div className="header2">
      <div className="header2-wrapper">
        <div>
          <img src={LOGO} className="LOGO" alt="LOGO" />
        </div>
        <div className="head-container2">
          {store && !store ? (
            <div className="store-group">
              <div className="store-img__wrapper">
                <img src={StoreOn} alt="Open" />
              </div>
              <div className="header-font">영업중</div>
            </div>
          ) : (
            <div className="store-group">
              <div className="store-img__wrapper">
                <img src={StoreOff} alt="Close" />
              </div>
              <div className="header-font">영업종료 </div>
            </div>
          )}
          {Sound && Sound ? (
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

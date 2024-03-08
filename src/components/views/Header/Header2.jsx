import axios from "axios";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { selectStoreState, soundState } from "../../../Atom/status";
import StoreOff from "../../../assets/icons/Header/CloseLight.svg"; //영업종료
import LOGO from "../../../assets/icons/Header/LOGO.svg"; //로고
import StoreOn from "../../../assets/icons/Header/OpenLight.svg"; //영업중
import SoundOff from "../../../assets/icons/Header/SoundOff.svg"; //소리끔
import SoundOn from "../../../assets/icons/Header/SoundOn.svg"; //소리켬
import "./Header.css";

const Header = () => {
  const baseUrl = process.env.REACT_APP_API_ROOT;
  const storeValue = useRecoilValue(selectStoreState); // 가게 영업 여부를 가져옵니다
  const setSelectStore = useSetRecoilState(selectStoreState); // 가게 영업 여부를 설정합니다
  const [sound, setSound] = useRecoilState(soundState); // 소리 여부를 가져옵니다

  const [cookies] = useCookies(["accessToken"]);

  useEffect(() => {
    if(cookies?.accessToken){
      const config = {
        withCredentials: true,
      };

      axios
        .get(`${baseUrl}/api/v1/store/sales`, config)
        .then((res) => {
          console.log(res);
          setSelectStore(res.data.status);
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClickHandler = () => {
    console.log(sound);
    // sound ? setSound(false) : setSound(true);
    setSound((prev) => !prev);
  };
  return (
    <div className="header2">
      <div className="header2-wrapper">
        <div>
          <img src={LOGO} className="LOGO" alt="LOGO" />
        </div>
        <div className="head-container2">
          {storeValue ? (
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
          {sound ? (
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

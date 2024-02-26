import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { soundState } from "../../../../Atom/status";
import StoreOff from "../../../../assets/icons/Header/CloseLight.svg"; //영업종료
import SoundOff from "../../../../assets/icons/Header/SoundOff.svg"; //소리끔
import SoundOn from "../../../../assets/icons/Header/SoundOn.svg"; //소리켬
import { IMAGES } from "../../../../constants/images";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const [sound, setSound] = useRecoilState(soundState); // 소리 여부를 가져옵니다
  // const [token, setToken] = useRecoilState(loginState);

  //const [cookies] = useCookies(["accessToken"]);

  // useEffect(() => {
  //   if (cookies?.accessToken) {
  //     const config = {
  //       headers: {
  //         Authorization: `Bearer ${token.accessToken}`
  //       }, 
  //       withCredentials: true,
  //     };

  //     // commonApis.get(`/api/v1/store/sales`, config).then((res) => {
  //     //   console.log(res);
  //     //   setSelectStore(res.data.status);
  //     // });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const onClickHandler = () => {
    console.log(sound);
    // sound ? setSound(false) : setSound(true);
    setSound((prev) => !prev);
  };
  return (
    <div className="header2">
      <div className="header2-wrapper">
        <div className="logo-wrapper">
          <img
            src={IMAGES.logo}
            className="LOGO"
            alt="LOGO"
            onClick={() => navigate(`/main`)}
          />
        </div>
        <div className="head-container2">
          {/* {storeValue ? (
            <div className="store-group">
              <div className="store-img__wrapper">
                <img src={StoreOn} alt="Open" />
              </div>
              <div className="header-font">영업중</div>
            </div>
          ) : ( */}
            <div className="store-group">
              <div className="store-img__wrapper">
                <img src={StoreOff} alt="Close" className="store_img"/>
              </div>
              <div className="store_font_wrapper">
                <div className="header-font">영업종료</div>
              </div>
            </div>
          {/* )} */}
          {sound ? (
            <div className="header-img-wrapper">
              <img
                src={SoundOn}
                onClick={onClickHandler}
                alt="SoundOn"
                className="soundImg"
              />
            </div>
          ) : (
            <div className="header-img-wrapper">
              <img
                src={SoundOff}
                onClick={onClickHandler}
                alt="SoundOff"
                className="soundImg"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;

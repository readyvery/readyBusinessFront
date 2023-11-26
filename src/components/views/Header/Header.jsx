import React from "react";
import { Col, Row } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";
import { soundState, storeState } from "../../../Atom/status";
import StoreOff from "../../../assets/icons/Header/CloseLight.svg"; //영업종료
import LOGO from "../../../assets/icons/Header/LOGO.svg"; //로고
import StoreOn from "../../../assets/icons/Header/OpenLight.svg"; //영업중
import SoundOff from "../../../assets/icons/Header/SoundOff.svg"; //소리끔
import SoundOn from "../../../assets/icons/Header/SoundOn.svg"; //소리켬
import "./Header.css";

const Header = () => {
  const Store = useRecoilValue(storeState);
  const [Sound, setSound] = useRecoilState(soundState);

  const ClickTrue = () => {
    setSound(true);
    console.log(Sound);
  };

  const ClickFalse = () => {
    setSound(false);
    console.log(Sound);
  };

  // const apiUrl = process.env.REACT_APP_API_ROOT;
  //   const [storeOpen, setStoreOpen] = useState(false);
  //   useEffect(() => {
  //     const config = {
  //       withCredentials: true,
  //     }
  //     axios
  //     .get(`${apiUrl}/api/v1/store/sales`, config)
  //     .then((response) => {
  //       console.log(response);
  //             setStoreOpen(response.data);
  //             console.log(storeOpen);
  //         })
  //         .catch((error) => {
  //             console.error(error);
  //         }
  //         // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <div className="header">
      <Row>
        <Col>
          <img src={LOGO} className="LOGO" alt="LOGO" />
        </Col>
        <Col />
        <Col className="head-container">
          {!Store ? (
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
          {Sound ? (
            <img src={SoundOn} onClick={ClickFalse} alt="SoundOn" />
          ) : (
            <img src={SoundOff} onClick={ClickTrue} alt="SoundOff" />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Header;

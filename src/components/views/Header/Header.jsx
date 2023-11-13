import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
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
    <div className="header">
      <Row>
        <Col>
          <img src={LOGO} className="LOGO" alt="LOGO" />
        </Col>
        <Col />
        <Col className="head-container">
          {!Store ? (
            <div className="store-group">
              <img src={StoreOn} alt="Open" />
              <div className="font">영업중</div>
            </div>
          ) : (
            <div className="store-group">
              <img src={StoreOff} alt="Close" />
              <div className="font">영업종료 </div>
            </div>
          )}
          {Sound ? (
            <img src={SoundOn} onClick={onClickHandler} alt="SoundOn" />
          ) : (
            <img src={SoundOff} onClick={onClickHandler} alt="SoundOff" />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Header;

import React, { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { selectStatus } from "../../Atom/order";
import { soundState } from "../../Atom/status";
import MP from "../../assets/Very.mp3";
import EffectSound from "../../utils/EffectSound";
import "./MainHome.css";
import Complete from "./StatusHome/Complete";
import Progress from "./StatusHome/Progress";
import Wait from "./StatusHome/Wait";

const MainHome = ({ waitInfo, makeInfo, completeInfo, pickUpInfo }) => {
  const Mp = EffectSound(MP, 1);
  const setStatusSelect = useSetRecoilState(selectStatus);

  const [status, setStatus] = useState("Wait");
  const [sound] = useRecoilState(soundState);
  
  useEffect(() => {
    console.log(sound);
    console.log(waitInfo);
    if (sound && waitInfo?.orders?.length > 0) {
      console.log("소리 재생");
      Mp.play();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [waitInfo])

  const onClickHandler = (e) => {
    const name = e.target.id;
    if (name === status) return;

    setStatus(name);

    if (name === "Wait") setStatusSelect("pending");
    else if (name === "Progress") setStatusSelect("progress");
    else if (name === "Complete") setStatusSelect("complete");
    else if (name === "PickUp") setStatusSelect("pickup");
    else setStatusSelect("null");
  };

  // useEffect(() => {
  //   fetchData();

  //   const intervalId = setInterval(fetchData, 5000); // 5초마다 실행

  //   return () => clearInterval(intervalId);

  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <div className="Main-Box">
      <div className="status-header">
        <div className="main-header__wrapper">
          <div className="main-header-btn__wrapper">
            <div
              id="Wait"
              className={`main-header-btn ${status === "Wait" && "selected"}`}
              onClick={onClickHandler}
            >
              대기 {waitInfo?.orders?.length > 0 ? waitInfo.orders?.length : 0}
            </div>
          </div>
          <div className="main-header-btn__wrapper">
            <div
              id="Progress"
              className={`main-header-btn ${
                status === "Progress" && "selected"
              }`}
              onClick={onClickHandler}
            >
              제조중{" "}
              {makeInfo?.orders?.length > 0 ? makeInfo.orders?.length : 0}
            </div>
          </div>
          <div className="main-header-btn__wrapper">
            <div
              id="Complete"
              className={`main-header-btn ${
                status === "Complete" && "selected"
              }`}
              onClick={onClickHandler}
            >
              픽업 관리{" "}
            </div>
          </div>
        </div>
      </div>

      {status === "Wait" ? (
        <Wait orderInfo={waitInfo} />
      ) : status === "Progress" ? (
        <Progress orderInfo={makeInfo} />
      ) : status === "Complete" ? (
        <Complete orderInfo={completeInfo} pickUpInfo={pickUpInfo} />
      ) : (
        <div>ERROR</div>
      )}
    </div>
  );
};

export default MainHome;

import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { soundState } from "../../Atom/status";
import MP from "../../assets/Very.mp3";
import EffectSound from "../../utils/EffectSound";
import "./MainHome.css";

const MainHome = ({ waitInfo, children }) => {
  // { waitInfo, makeInfo, completeInfo, pickUpInfo }
  const Mp = EffectSound(MP, 1);
  // const setStatusSelect = useSetRecoilState(selectStatus);

  const [status, setStatus] = useState(1);
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
    // const { id } = e.target;
    setStatus(e);
  };

  // useEffect(() => {
  //   fetchData();

  //   const intervalId = setInterval(fetchData, 5000); // 5초마다 실행

  //   return () => clearInterval(intervalId);

  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <div className="Main-Box">
      {children}
    </div>
  );
};

export default MainHome;

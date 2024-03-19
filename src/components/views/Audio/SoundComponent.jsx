import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { soundState } from '../../../Atom/status';
import { IMAGES } from "../../../constants/images";
// import { useAudioManager } from '../../../hooks/useAudioManager';
import useSound from 'use-sound';
import Very from "../../../assets/Very.mp3";
import { useFetchWaitInfo } from '../../../hooks/useFetchWaitInfo';

const SoundComponent = () => {
  const [sound, setSound] = useRecoilState(soundState); // 소리 여부를 가져옵니다

  const onClickHandler = () => {
    console.log(sound);
    setSound((prev) => !prev);
  }

  const {data: waitData} = useFetchWaitInfo();
  // const soundRef = useRef(undefined);
  const [soundPlay] = useSound(Very);

  useEffect(() => {
    // let interval = null;

    if(sound && waitData?.data?.orders?.length > 0){
      console.log('소리 출력');
      soundPlay();
    }

    // return () => {
    //     if(interval){
    //         clearInterval(interval);
    //     }
    // };
  }, [waitData, sound, soundPlay]);

  return (<>
    {sound ? (
        <div className="header-img-wrapper">
            <img
            src={IMAGES.sound_on}
            onClick={onClickHandler}
            alt="SoundOn"
            className="soundImg"
            />
        </div>
        ) : (
        <div className="header-img-wrapper">
            <img
            src={IMAGES.sound_off}
            onClick={onClickHandler}
            alt="SoundOff"
            className="soundImg"
            />
        </div>
          )}
  </>);
};

export default SoundComponent;
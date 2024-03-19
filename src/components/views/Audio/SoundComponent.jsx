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
  const [soundPlay, {stop}] = useSound(Very);

  useEffect(() => {
      if(sound && waitData?.data?.orders?.length > 0 && document.visibilityState === 'visible'){
        console.log('소리 출력');
        soundPlay();
      } else {
        stop();
      }
  }, [waitData, sound, soundPlay, stop]);

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
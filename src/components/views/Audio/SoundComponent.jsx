import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import useSound from 'use-sound';
import { soundState } from '../../../Atom/status';
import Very from "../../../assets/Very.mp3";
import { IMAGES } from "../../../constants/images";
import { useFetchWaitInfo } from '../../../hooks/useFetchWaitInfo';

const SoundComponent = () => {
  // const audioManager = useAudioManager();
  const [soundPlay] = useSound(Very);
  const [sound, setSound] = useRecoilState(soundState); // 소리 여부를 가져옵니다

  const onClickHandler = () => {
    console.log(sound);
    setSound((prev) => !prev);
  }

  const {data: waitData} = useFetchWaitInfo();
  // const [soundPlay, {stop}] = useSound(Very);

  useEffect(() => {
    let interval = null;
    if(sound && waitData?.data?.orders?.length > 0){
      interval = setInterval(() => {
        console.log('소리 출력');
        soundPlay();
      }, 3000);
    } 
    
    return () => {
      if(interval){
        clearInterval(interval);
      }
    }
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
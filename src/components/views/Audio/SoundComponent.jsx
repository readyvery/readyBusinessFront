import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { soundState } from '../../../Atom/status';
import { IMAGES } from "../../../constants/images";
import { useAudioManager } from '../../../hooks/useAudioManager';
import { useFetchWaitInfo } from '../../../hooks/useFetchWaitInfo';

const SoundComponent = () => {
  const audioManager = useAudioManager();
  const [sound, setSound] = useRecoilState(soundState); // 소리 여부를 가져옵니다

  const onClickHandler = () => {
    console.log(sound);
    setSound((prev) => !prev);
  }

  const {data: waitData} = useFetchWaitInfo();

  useEffect(() => {
    let interval = null;

    if(sound && waitData?.data?.orders?.length > 0){
        interval = setInterval(() => {
            console.log('소리 출력');
            audioManager.playSound();
        }, 3000); // 매 3초마다 소리 재생
    }

    return () => {
        if(interval){
            clearInterval(interval);
        }
    };
  }, [waitData, sound, audioManager]);

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
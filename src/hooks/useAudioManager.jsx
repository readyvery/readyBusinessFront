import { useRef } from 'react';
// import useSound from 'use-sound';
import Very from "../assets/Very.mp3";


export const useAudioManager = (() => {
  let instance = null;

  return () => {
    const audioRef = useRef(null);

    if (!instance) {
      audioRef.current = new Audio(Very);
      instance = {
        playSound: () => {
          audioRef.current.play().catch((e) => console.log('Error playing sound: ', e));
        }
      };
    }

    return instance;
  };
})();
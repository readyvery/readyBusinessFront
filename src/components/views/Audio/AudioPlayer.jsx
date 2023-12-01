import VeryMp3 from "../../../assets/Very.mp3";

const AudioPlayer = () => {
  const audio = new Audio(VeryMp3);
  audio.play();
  // 1초 후에 소리 멈춤
  setTimeout(() => {
    // setplaySound(false);
    console.log("소리 멈춤");
  }, 100);
};

export default AudioPlayer;

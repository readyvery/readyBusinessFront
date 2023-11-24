import VeryMp3 from "../../../assets/Very.mp3";

const AudioPlayer = () => {
  const audio = new Audio(VeryMp3);
  audio.play().catch((error) => {
    // Autoplay was prevented, handle it here
    console.error("Autoplay prevented:", error);
  });
};

export default AudioPlayer;

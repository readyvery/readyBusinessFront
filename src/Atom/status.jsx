import { atom } from "recoil";

const storeStatus = atom({
  key: "storeStatus", // 전역적으로 고유한 값
  default: false, // 초깃값
});

export default storeStatus;

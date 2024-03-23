import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();


export const ordercnt = atom({
  key: "ordercnt",
  default: {
    pending: 0,
    progress: 0,
    complete: 0,
  },
});

export const selectStatus = atom({
  key: "selectStatus",
  default: "null",
});

export const selectOrder = atom({
  key: "selectOrder",
  default: null,
});

export const selectTotal = atom({
  key: "selectTotal",
  default: [],
});

export const selectId = atom({
  key: "selectId",
  default: 0,
  effects_UNSTABLE: [persistAtom],
})
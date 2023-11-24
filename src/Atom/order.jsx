import { atom } from "recoil";

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

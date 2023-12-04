import axios from "axios";
import { atom, selector } from "recoil";
import { recoilPersist } from 'recoil-persist';
import { Refresh } from "../hoc/handleRefresh";

const { persistAtom } = recoilPersist();

export const storeState = atom({
  key: "storeState", // 전역적으로 고유한 값
  default: false, // 초깃값
  effects_UNSTABLE: [persistAtom],
});

export const selectStoreState = selector({
  key: "selectStoreState",
  get: ({ get }) => {
    return get(storeState);
  },

  set: ({ set }, newValue) => {
    set(storeState, newValue);
  },
  effects_UNSTABLE: [persistAtom],
});

export const soundState = atom({
  key: "soundState",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const selectSoundState = selector({
  key: "selectSoundState",
  get: ({ get }) => {
    return get(soundState);
  },

  set: ({ set }, newValue) => {
    set(soundState, newValue);
  },
  effects_UNSTABLE: [persistAtom],
});

export const isRecentFirstState = atom({
  key: "isRecentFirstState",
  default: true,
  effects_UNSTABLE: [persistAtom],
});

export const isAuthenticatedState = atom({
  key: "isAuthenticatedState",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const getAuthenticatedSelector = selector({
  key: "auth/get",
  get: async ({ get }) => {
    const tokenResult = Refresh();
    if (tokenResult) {
      return "재발급 성공";
    } else {
      return "토큰 유효";
    }
  },

  set: ({ set }) => {
    set(isAuthenticatedState, (currentValue) => !currentValue);
  },
  effects_UNSTABLE: [persistAtom],
});

export const loginState = atom({
  key: "loginState",
  default: {
    accessToken: null,
    expiredTime: null,
  },
  effects_UNSTABLE: [persistAtom],
});

export const userState = atom({
  key: "userState",
  dafault: null,
  effects_UNSTABLE: [persistAtom],
});

export const getUserSelector = selector({
  key: "user/get",
  get: async ({ get, set }) => {
    try {
      const apiUrl = process.env.REACT_APP_API_ROOT;
      const config = {
        withCredentials: true,
      };
      const response = await axios.get(`${apiUrl}/api/v1/auth`, config);
      const userData = response.data;
      // if (JSON.stringify(userState) !== JSON.stringify(userData)) {
      //   // 다르면 userInfo 업데이트
      //   // set(userState, userData);
      // }
      return userData;
    } catch (err) {
      // 에러처리
      return "404";
    }
  },

  set: ({ set }, newValue) => {
    set(userState, newValue);
  },
  effects_UNSTABLE: [persistAtom],
});

// export const waitorderState = atom({
//   key: "waitorderState",
//   default: [],
// });

// export const selectWaitOrderState = selector({
//   key: "selectWaitOrderState",
//   get: ({ get }) => {
//     return get(waitorderState);
//   },

//   set: ({ set }, newValue) => {
//     set(waitorderState, newValue);
//   },
// });

// export const makeorderState = atom({
//   key: "makeorderState",
//   default: [],
// });

// export const selectMakeOrderState = selector({
//   key: "selectMakeOrderState",
//   get: ({ get }) => {
//     return get(makeorderState);
//   },

//   set: ({ set }, newValue) => {
//     set(makeorderState, newValue);
//   },
// });

// export const completeorderState = atom({
//   key: "completeorderState",
//   default: [],
// });

// export const selectCompleteOrderState = selector({
//   key: "selectCompleteOrderState",
//   get: ({ get }) => {
//     return get(completeorderState);
//   },

//   set: ({ set }, newValue) => {
//     set(completeorderState, newValue);
//   },
// });

import axios from "axios";
import { atom, selector } from "recoil";
import { recoilPersist } from 'recoil-persist';
import { Refresh } from "../util/handleRefresh";

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

export const tokenSelector = selector({
  key: "tokenSelector",
  get: ({ get }) => {
    const { accessToken } = get(loginState);
    return accessToken;
  },
  set: ({ set }, newState) => {
    set(loginState, (prevState) => ({
      ...prevState,
      ...newState,
    }));
  },
});

export const getLoginState = selector({
  key: 'getLoginState',
  get: ({ get }) => {
    const loginStateValue = get(loginState);
    const { accessToken } = loginStateValue;
    return accessToken;
  },
});
export const setLoginState = ({set}, newState) => {
  set(loginState, (prevState) => ({
    ...prevState,
    ...newState,
  }));
};

export const userState = atom({
  key: "userState",
  dafault: null,
  effects_UNSTABLE: [persistAtom],
});

// ceo(true) or ready(false)
export const ceoState = atom({
  key: "ceoState",
  default: false,
  effects_UNSTABLE: [persistAtom],
})

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

// 회원가입시
export const userIdState = atom({
  key: "userIdState",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const userPasswordState = atom({
  key: "userPasswordState",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const userConfirmPasswordState = atom({
  key: "userConfirmPasswordState",
  default: null,
  effects_UNSTABLE: [persistAtom],
})

export const userNameState = atom({
  key: "userNameState",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const userIdDuplicateState = atom({
  key:"userIdDuplicateState",
  default: null,
  effects_UNSTABLE: [persistAtom],
})

//아이디 비번찾기 상태값
export const findState = atom({
  key:"findState",
  default: null,
  effects_UNSTABLE: [persistAtom],
})
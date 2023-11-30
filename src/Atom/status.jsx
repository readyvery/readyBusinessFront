import axios from "axios";
import { atom, selector } from "recoil";
import { Refresh } from "../hoc/handleRefresh";

export const storeState = atom({
  key: "storeState", // 전역적으로 고유한 값
  default: false, // 초깃값
});

export const selectStoreState = selector({
  key: "selectStoreState",
  get: ({ get }) => {
    return get(storeState);
  },

  set: ({ set }, newValue) => {
    set(storeState, !newValue);
  },
})

export const soundState = atom({
  key: "soundState",
  default: true,
});

export const isAuthenticatedState = atom({
  key: "isAuthenticatedState",
  default: false,
});

export const getAuthenticatedSelector = selector({
  key: "auth/get",
  get: async ({ get }) => {
    const tokenResult = Refresh();
    if(tokenResult){
      return "재발급 성공";
    } else { return "토큰 유효"; }
  },

  set: ({ set }) => {
    set(isAuthenticatedState, (currentValue) => !currentValue);
  },
});

export const loginState = atom({
  key: "loginState",
  default: {
    accessToken: null,
    expiredTime: null,
  },
});

export const userState = atom({
  key: "userState",
  dafault: null,
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
});

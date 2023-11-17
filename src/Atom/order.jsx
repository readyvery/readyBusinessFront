import { atom } from "recoil";

export const orders = atom(
  {
    key: "orders", // 전역적으로 고유한 값
    default: {
      id: 0, //db 인덱스
      orderNum: 0, // 그날의 그가게의 주문번호
      pickUp: "",
      foodies: [
        {
          name: "",
          count: 0,
          options: [""],
        },
      ],
      phone: "", // 고객의 전화번호
      time: "", // 주문시간
      payment: "",
      price: 0,
    },
  } // 초깃값
);

<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { ordercnt, selectOrder, selectStatus } from "../../../Atom/order";
import { soundState } from "../../../Atom/status";
// import VeryMp3 from "../../../assets/Very.mp3";
import downArrow from "../../../assets/icons/icon_downArrow_black.svg";
import AudioPlayer from "../../../components/views/Audio/AudioPlayer";
import OrderBox from "../../../components/views/Order/OrderBox";
import "./DetailHome.css";

const Wait = () => {
  const [orderCount, setOrderCount] = useRecoilState(ordercnt); // Recoil 상태 가져오기
  const [orderSelect, setOrderSelect] = useRecoilState(selectOrder);
  const [statusSelect, setStatusSelect] = useRecoilState(selectStatus);
  const playSound = useRecoilState(soundState);

  const orderInfo = {
    orders: [
      {
        id: 123, //db 인덱스
        orderNum: 2, // 그날의 그가게의 주문번호
        pickUp: "픽업",
        foodies: [
          {
            name: "아메리카노",
            count: 3,
            options: ["샷 추가", "휘핑", "ICE", "그란데"],
          },
        ],
        phone: "010-6439-3547", // 고객의 전화번호
        time: "21/11/08 11:44:30", // 주문시간
        payment: "현대카드",
        price: 8500,
      },
      {
        id: 124, //db 인덱스
        orderNum: 3, // 그날의 그가게의 주문번호
        pickUp: "매장",
        foodies: [
          {
            name: "아메리카누",
            count: 3,
            options: ["샷 추가 *100 ", "휘핑 *1000", "HOT", "그란데"],
          },
        ],
        phone: "010-7679-3547", // 고객의 전화번호
        time: "23/11/08 11:44:30", // 주문시간
        payment: "현대카드",
        price: 78500,
      },
      {
        id: 125,
        orderNum: 4,
        pickUp: "픽업",
        foodies: [
          {
            name: "아메리카노",
            count: 3,
            options: ["샷 추가", "휘핑", "ICE", "그란데"],
          },
        ],
        phone: "010-6439-3547", // 고객의 전화번호
        time: "21/11/08 11:44:30", // 주문시간
        payment: "현대카드",
        price: 8500,
      },
      {
        id: 126,
        orderNum: 5,
        pickUp: "매장",
        foodies: [
          {
            name: "아메리카노",
            count: 3,
            options: ["샷 추가", "휘핑", "ICE", "그란데"],
          },
        ],
        phone: "010-6439-3547", // 고객의 전화번호
        time: "21/11/08 11:44:30", // 주문시간
        payment: "현대카드",
        price: 8500,
      },
    ],
  };
=======
import React, { useState } from "react";
// import { soundState } from "../../../Atom/status";
import downArrow from "../../../assets/icons/icon_downArrow_black.svg";
// import AudioPlayer from "../../../components/views/Audio/AudioPlayer";
import { useSetRecoilState } from "recoil";
import { selectOrder, selectStatus } from "../../../Atom/order";
import OrderBox from "../../../components/views/Order/OrderBox";
import "./DetailHome.css";

const Wait = ({orderInfo}) => {
  // const [orderCount, setOrderCount] = useRecoilState(ordercnt); // Recoil 상태 가져오기
  const setOrderSelect = useSetRecoilState(selectOrder);
  const setStatusSelect = useSetRecoilState(selectStatus);
>>>>>>> 9c7e616e0f43d6d2b695691e41d952484a7b9e17

  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [isRecentFirst, setIsRecentFirst] = useState(false);

  const sortedOrders = isRecentFirst
    ? [...(orderInfo?.orders || [])].sort((prev, cur) => {
      if (prev?.price > cur?.price) return -1;
      if (prev?.price < cur?.price) return 1;
      return 0;
    })
    : orderInfo?.orders;

  const onClickHandler = (selectedOrder) => {
    setOrderSelect(selectedOrder);
    setSelectedOrderId(selectedOrder?.idx && selectedOrder?.idx);

    if(selectedOrder === null){
      setStatusSelect("null");
    } else {
      setStatusSelect("pending");
    }
  };

<<<<<<< HEAD
  // const Player = () => {
  //   const audio = new Audio(VeryMp3);
  //   if (playSound) {
  //     console.log(soundState);
  //     audio.play();
  //   }
  // };

  //api 연결
  //   const apiUrl = process.env.REACT_APP_API_ROOT;
  //   const [storeOpen, setStoreOpen] = useState(false);
  //   useEffect(() => {
  //     const config = {
  //       withCredentials: true,
  //     }
  //     axios
  //     .get(`${apiUrl}/api/v1/store/sales`, config)
  //     .then((response) => {
  //       console.log(response);
  //             setStoreOpen(response.data);
  //             console.log(storeOpen);
  //         })
  //         .catch((error) => {
  //             console.error(error);
  //         }
  //         // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    // OrderBox가 생성될 때마다 개수 증가
    setOrderCount((prev) => ({ ...prev, pending: orderInfo.orders.length }));

    if (playSound && orderInfo.orders.length !== 0) {
      AudioPlayer(); // 소리 재생
    }
  }, [orderInfo.orders.length, setOrderCount, playSound]);
=======
  // useEffect(() => {
  //   // OrderBox가 생성될 때마다 개수 증가
  //   setOrderCount((prev) => ({ ...prev, pending: orderInfo?.orders?.length }));
  // }, [orderInfo]);
>>>>>>> 9c7e616e0f43d6d2b695691e41d952484a7b9e17

  return (
    <div className="Order-wrapper">
      <div className="Order-title__wrapper">
        <span className="Order-title__span">주문번호</span>
        <span className="Order-title__span">주문일시</span>
        <span className="Order-title__span">픽업유무</span>
        <span className="Order-title__span">주문금액</span>
        {isRecentFirst ? (
          <span
            className="Order-title__span"
            onClick={() => setIsRecentFirst(!isRecentFirst)}
          >
            가격순
            <img alt="new" className="Arrowicon" src={downArrow} />
          </span>
        ) : (
          <span
            className="Order-title__span"
            onClick={() => setIsRecentFirst(!isRecentFirst)}
          >
            최신순
            <img alt="new" className="Arrowicon" src={downArrow} />
          </span>
        )}
      </div>
      <div className="Order-content__wrapper">
        {sortedOrders?.length && sortedOrders?.map((order) => (
          <OrderBox
            key={order.id}
            onSelect={onClickHandler}
            order={order}
            selectedOrderId={selectedOrderId}
          />
        ))}
      </div>
      {/* <button onClick={Player}>Play Audio</button> */}
    </div>
  );
};

export default Wait;

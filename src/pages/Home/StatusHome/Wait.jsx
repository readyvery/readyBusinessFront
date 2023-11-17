import React from "react";
import "./DetailHome.css";

const Wait = () => {
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
        id: 133, //db 인덱스
        orderNum: 33, // 그날의 그가게의 주문번호
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
    ],
  };

  return (
    <div className="Order-wrapper">
      <div className="Order-title__wrapper">
        <span className="Order-title__span">주문번호</span>
        <span className="Order-title__span">주문일시</span>
        <span className="Order-title__span">픽업유무</span>
        <span className="Order-title__span">주문금액</span>
        {/* 최신순 */}
        {/* <div className="mainInven-title__span2__wrapper" onClick={chnMenu}>
          <span style={{ 'width': '1.125rem' }}></span>
          <span className="mainInven-title__span2">{category}</span>
          {isCategoryOpen ? (<span><img src={downArrow} alt="downArrow"/></span>) : (<span><img src={upArrow} alt="upArrow"/></span>)}
        </div> */}
        <span className="Order-title__span">최신순</span>
      </div>

      {/* <div className="Order-content__wrapper">
        {orderInfo.map((orders) => (
          <div key={orders.id}>
            <OrderBox
              orderProps={{
                orderNum: orders.orderNum,
                time: orders.time,
                pickUp: orders.pickUp,
                price: orders.price,
              }}
            />
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default Wait;

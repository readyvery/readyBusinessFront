import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
// import { useRecoilCallback } from "recoil";
// import { orderState } from "../../Atom/status";
import "./DetailHome.css";

const Wait = () => {
  const [selectOrder, setselectOrder] = useState(0);
  // const setOrderState = useRecoilCallback(({ set }) => async () => {
  //   set(orderState.progress,!orderState.progress);
  // });
  const onClickHandler = (e) => {
    setselectOrder(!selectOrder);
    // setOrderState();
  };
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
      // {
      //   id: 133, //db 인덱스
      //   orderNum: 33, // 그날의 그가게의 주문번호
      //   pickUp: "매장",
      //   foodies: [
      //     {
      //       name: "아메리카누",
      //       count: 3,
      //       options: ["샷 추가 *100 ", "휘핑 *1000", "HOT", "그란데"],
      //     },
      //   ],
      //   phone: "010-7679-3547", // 고객의 전화번호
      //   time: "23/11/08 11:44:30", // 주문시간
      //   payment: "현대카드",
      //   price: 78500,
      // },
    ],
  };
  return (
    <Container className="orderWait">
      <div className="listTable">
        <Row className="Wait-Row">
          <Col>주문번호</Col>
          <Col>주문일시</Col>
          <Col>픽업유무</Col>
          <Col>주문금액</Col>
          <Col>최신순</Col>
        </Row>{" "}
        <Button
          name="waitOrder"
          onClick={onClickHandler}
          style={{
            padding: "0px",
            width: "100%",
            backgroundColor: selectOrder ? "#D8235626" : "#FFFFFF",
            border: "2px solid",
            borderColor: "#DADADA",
          }}
        >
          {orderInfo.orders.map((order) => (
            <Row className="indexTable">
              <Col>{order.orderNum}</Col>
              <Col>{order.time}</Col>
              <Col>{order.pickUp}</Col>
              <Col>{order.price}</Col>
              <Col></Col>
            </Row>
          ))}
        </Button>
      </div>
      {/* <table className="listTable">
        <thead>
          <tr className="indexTable">
            <th>주문번호</th>
            <th>주문일시</th>
            <th>픽업유무</th>
            <th>주문금액</th>
            <th>최신순</th>
          </tr>
        </thead>
        <tbody>
          {orderInfo.orders.map((order) => (
            <tr className="indexTable">
              <td>{order.orderNum}</td>
              <td>{order.time}</td>
              <td>{order.pickUp}</td>
              <td>{order.price}</td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </Container>
  );
};

export default Wait;

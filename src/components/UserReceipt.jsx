import React from "react";
import { Br, Cut, Line, Printer, Row, Text } from 'react-thermal-printer';
import "./UserReceipt.css";

function UserReceipt (props) {
  console.log(props);
  const {foodies, orderNum, pickUp, time} = props;
  return (
    <Printer type="epson" width={42} characterSet="korea">
      
      <Text>[{pickUp}]{/*픽업 or 매장용*/}</Text>
      <Br />
      <Text size={{ width: 2, height: 2 }} align="center" bold={true}>
        ReadyVery
      </Text>
      <Br />
      <Text bold={true}>주문번호: {orderNum} {/*idx*/}</Text>
      <Line />
      <Row left="메뉴명" right="수량" />
      <Line />
      <Br />
      <Line />
      {foodies?.map((e) => {
        const count = e.count;
        const name = e.name;
        const option = e.option;
        return (<>
          <Row
            left={`- ${name}`}
            right={`${count}`}
          />
          {
            option?.map((el) => (
              <Text align="left">ㄴ ({el.category}){el.name}</Text>
            ))
          }
        </>
      )})}
      <Line />
      <Text>주문시간: {time.split("T")[0]} {time.split("T")[1].split(".")[0]}</Text>
      <Br />
      <Cut />
    </Printer>
  );
};

export default UserReceipt;

import React from "react";
import { Br, Cut, Line, Printer, Row, Text } from 'react-thermal-printer';
import "./UserReceipt.css";

function UserReceipt () {
  // const context = useContext(HomeContext);
  // const selectedInfo = context.selectedMenu;
  // console.log(selectedInfo);

  return (
    <Printer type="epson" width={42} characterSet="korea">
      
      <Text>[매장용]{/*픽업 or 매장용*/}</Text>
      <Br />
      <Text size={{ width: 3, height: 3 }} align="center" bold={true}>
        ReadyVery
      </Text>
      <Br />
      <Text bold={true}>주문번호: 69 {/*idx*/}</Text>
      <Line />
      <Row left="메뉴명" right="수량" />
      <Line />
      <Row
        left={<Text size={{width: 2, height: 2}}>- 아메리카노</Text>}
        right={<Text size={{width: 2, height: 2}}>2</Text>}
      />
      <Text align="left">ㄴ 기본사이즈</Text>
      <Text align="left">ㄴ 샷추가</Text>
      <Line />
      <Text>주문시간: 00/11/17 17:50:02</Text>
      <Br />
      <Cut />
    </Printer>
  );
};

export default UserReceipt;

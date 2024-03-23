import React from "react";
import { Br, Cut, Line, Printer, Row, Text } from 'react-thermal-printer';
import "./UserReceipt.css";

function UserReceipt () {
  // const context = useContext(HomeContext);
  // const selectedInfo = context.selectedMenu;
  // console.log(selectedInfo);

  return (
    <Printer type="epson" width={42} characterSet="korea">
      
      <Text>주방주문서</Text>
      <Text size={{ width: 2, height: 2 }}>
        [주문시간] 2000-11-17 17:50
      </Text>
      <Text>[오더번호] 69</Text>
      <Line />
      <Row left="메뉴명" right="수량(구분)" />
      <Line />
      <Br />
      <Line />
      <Row left={'상품명'} right={`수량 (신규)`} />
      <Row
        left={`ㄴ 아메리카노`}
        right={`1`}
      />
      <Br />
      <Line />
      <Text>매장컵</Text>
      <Line />
      <Br />
      <Line />
      <Cut />
    </Printer>
  );
};

export default UserReceipt;

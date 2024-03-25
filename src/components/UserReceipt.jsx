import React from "react";
import { Br, Cut, Line, Printer, Row, Text } from "react-thermal-printer";
import "./UserReceipt.css";

function UserReceipt(props) {
  console.log(props);
  const { foodies, idx, pickUp, time } = props;
  return (
    <Printer type="epson" width={42} characterSet="korea">
      <Row left={`[${pickUp === 1 ? '픽업' : '매장'}]`} right="ReadyVery" />
      <Br />
      <Text size={{ width: 3, height: 3 }} align="center" bold={true}>
        {idx} {/*idx*/}
      </Text>
      <Br />

      <Line />
      <Row left="메뉴명" right="수량" />
      <Line />
      {foodies?.map((e) => {
        const count = e.count;
        const name = e.name;
        const option = e.options;
        console.log(option);
        return (
          <>
            <Row
              left={
                <Text size={{ width: 2, height: 2 }} bold={true}>
                  - {name}
                </Text>
              }
              right={
                <Text size={{ width: 2, height: 2 }} bold={true}>
                  {count}
                </Text>
              }
            />
            {option?.map((el) => (
              <Text>
                ㄴ ({el.category}){el.name}
              </Text>
            ))}
          </>
        );
      })}
      <Line />
      <Text>
        주문시간: {time.split("T")[0]} {time.split("T")[1].split(".")[0]}
      </Text>
      <Br />
      <Cut />
    </Printer>
  );
}

export default UserReceipt;

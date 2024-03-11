import { useContext } from "react";
import { render } from "react-thermal-printer";
import styled from "styled-components";
import UserReceipt from "../components/UserReceipt";
import { HomeContext } from "./OrderManage/Home";

const ReceiptTest = () => {
  const context = useContext(HomeContext);
  const selectedInfo = context.selectedMenu;
  console.log(selectedInfo);

  const onClickPrintHandler = async () => {
    const data = await render(UserReceipt(selectedInfo[0]));
    const port = await window.navigator?.serial?.requestPort();
    // await port.open({ baudRate: 9600 });
    if (port.writable === null) {
      await port.open({ baudRate: 38400 });
    }
    const writer = port.writable?.getWriter();
    if (writer !== null) {
      await writer.write(data).then(() => setTimeout(() => port.close(), 500)); // ←
      writer.releaseLock();
    }
  };

  return (
    <>
      <ReceiptButton
        onClick={async () => {
          await onClickPrintHandler();
          // alert("smartorder-preparing");
        }}
      >
        {" "}
        영수증 출력{" "}
      </ReceiptButton>
    </>
  );
};

const ReceiptButton = styled.div`
  width: 10rem;
  height: 2.5rem;
  background-color: #d82356;
  border-radius: 1.25rem;
  color: #fff;
  line-height: 2.5rem;
  font-size: 1.2rem;
`;

export default ReceiptTest;

import { Printer, Text, render } from 'react-thermal-printer';

const ReceiptTest = (props) => {
  	// const orderInfo = props.orderInfo;
  
    const onClickPrintHandler = async () => {
      // const data = await render(UserReceipt());
      // const port = await window.navigator.serial.requestPort();
      // await port.open({ baudRate: 9600 });
      // const writer = port.writable?.getWriter();
      // if (writer !== null) {
      //   await writer.write(data);
      //   await writer.releaseLock();
      // }
      // await port.close({ baudRate: 9600 });

      const data = await render(
        <Printer type="epson">
          <Text>Hello World</Text>
        </Printer>
      );
      
      const port = await window.navigator.serial.requestPort();
      await port.open({ baudRate: 9600 });
      
      const writer = port.writable?.getWriter();
      if (writer != null) {
        await writer.write(data);
        writer.releaseLock();
      }
      await port.close({ baudRate: 9600 });
  };
  
  
  return (
   <div>
    
    <div
      onClick={async () => {
        await onClickPrintHandler();
        alert("smartorder-preparing");
      }}
     > 접수하기 </div>
    
   </div>
 );
};

export default ReceiptTest;
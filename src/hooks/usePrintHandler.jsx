import { useContext, useState } from "react";
import { render } from "react-thermal-printer";
// import { useContext } from "react";
// import { useRecoilState } from "recoil";
// import { portState } from "../Atom/status";
import UserReceipt from "../components/UserReceipt";
import { HomeContext } from "../pages/OrderManage/Home";

const usePrintHandler = () => {
    const context = useContext(HomeContext);
    const selectedInfo = context.selectedMenu;
    console.log(selectedInfo);
    // const [savePort, setSavePort] = useRecoilState(portState);
    const [savePort, setSavePort] = useState(null);
    console.log(savePort);

    const onClickPrintHandler = async () => {
    const data = await render(UserReceipt(selectedInfo[0]));
    // const port = await window.navigator.serial.requestPort();
    let port;
    if (savePort === null) {
      port = await window.navigator?.serial?.requestPort();
      setSavePort(port);
    } else if (savePort !== null ) {
      port = savePort;
    }

    console.log(port);
    if (port.writable === null) {
        // await port.open({ baudRate: 38400 });
        await port.open({ baudRate: 9600 });
    }
    const writer = port.writable?.getWriter();
    if (writer !== null) {
        await writer.write(data).then(() => setTimeout(() => port.close(), 500)); // ←
        writer.releaseLock();
    }

    };

    return onClickPrintHandler;
}

export default usePrintHandler;
import { useContext, useState } from "react";
import { render } from "react-thermal-printer";
// import { useRecoilState } from "recoil";
// import { portState } from "../Atom/status";
import UserReceipt from "../components/UserReceipt";
import { HomeContext } from "../pages/OrderManage/Home";

const usePrintHandler = () => {
    const context = useContext(HomeContext);
    const selectedInfo = context.selectedMenu;
    // const [savePort, setSavePort] = useRecoilState(portState);
    const [savePort, setSavePort] = useState(null);

    const onClickPrintHandler = async () => {
    const data = await render(UserReceipt(selectedInfo[0]));
    // const port = await window.navigator.serial.requestPort();
    let port;
    if (savePort === null) {
      port = await window.navigator?.serial?.requestPort();
      setSavePort(port);
    } else if (savePort !== null) {
      port = savePort;
    }

    if (port.writable === null) {
        await port.open({ baudRate: 38400 });
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
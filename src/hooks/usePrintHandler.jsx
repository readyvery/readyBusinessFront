import { useContext } from "react";
import { render } from "react-thermal-printer";
import UserReceipt from "../components/UserReceipt";
import { HomeContext } from "../pages/OrderManage/Home";

const usePrintHandler = () => {
    const context = useContext(HomeContext);
    const selectedInfo = context.selectedMenu;
    console.log(selectedInfo);

    const onClickPrintHandler = async () => {
    const data = await render(UserReceipt(selectedInfo[0]));
    const port = await window.navigator.serial.requestPort();
    await port.open({ baudRate: 9600 });
    const writer = port.writable?.getWriter();
    if (writer !== null) {
        await writer.write(data);
        await writer.releaseLock();
    }
    await port.close({ baudRate: 9600 });

    };

    return onClickPrintHandler;
}

export default usePrintHandler;
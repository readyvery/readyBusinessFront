import { useContext, useEffect, useState } from "react";
import { render } from "react-thermal-printer";
import UserReceipt from "../components/UserReceipt";
import { HomeContext } from "../pages/OrderManage/Home";
import useMypageStoreInformation from "./Mypage/useMypageStoreInformation";

const usePrintHandler = () => {
    const { getCafeInfo } = useMypageStoreInformation();
    const [cafeInfo, setCafeInfo] = useState({});
    const context = useContext(HomeContext);
    const selectedInfo = context.selectedMenu;
    console.log(selectedInfo);
    // const [savePort, setSavePort] = useRecoilState(portState);
    const [savePort, setSavePort] = useState(null);
    console.log(savePort);
    useEffect(() => {
      setCafeInfo(getCafeInfo);
    },[getCafeInfo])

    const onClickPrintHandler = async () => {
    const data = await render(UserReceipt(selectedInfo[0]));
    let port;
    if (savePort === null) {
      port = await window.navigator?.serial?.requestPort();
      setSavePort(port);
    } else if (savePort !== null ) {
      port = savePort;
    }

    console.log(port);
    if (port.writable === null) {
        if (cafeInfo?.storeName === "카페 오르다") {
          await port.open({ baudRate: 38400 });
        } else {
          await port.open({ baudRate: 9600 });
        }
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
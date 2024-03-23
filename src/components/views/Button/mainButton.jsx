import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { ceoState } from "../../../Atom/status";

const MainButton = () => {
    const navigate = useNavigate();
    const isCeo = useRecoilValue(ceoState);
    console.log(isCeo);
    return (
        <>
        {isCeo ? (
              <span
                className="main__order-management-btn"
                onClick={() => navigate(`/order`)}
              >
                주문관리 바로가기
              </span>
            ) : (
              <>
              <span
                className="main__order-management-btn disabled"
              >
                주문관리 바로가기
              </span>
              <span className="main__order-management__notice">
                매장관리 입력 후 이용 가능합니다.
              </span>
            </>
        )}
        </>
    )
}

export default MainButton;
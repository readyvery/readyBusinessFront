import { useNavigate } from "react-router-dom";

const OrderManagementBtn = () => {
  const navigate = useNavigate();

  return (
    <div className="OrderManagementBtn">
      <span
        className="main__order-management-btn"
        onClick={() => navigate(`/order`)}
      >
        주문관리 바로가기
      </span>
      {/* 버튼 비활성화 시 표시 */}
      {/* <span className="main__order-management__notice">
        매장관리 입력 후 이용 가능합니다.
      </span> */}
    </div>
  );
};

export default OrderManagementBtn;

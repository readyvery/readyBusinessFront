import Header from "../../components/views/Header/HeaderOrder/Header2";
import Home from "./Home";

// 주문관리 가장 상위 컴포넌트
const Order = () => {
  return (
    <>
      <Header />
      <Home defaultStatus={1} defaultValue={0} setSelectedMenu={{}}>
        {/* 주문 목록 */}
        <Home.MainHome>
          <Home.StatusHeader>
            <Home.StatusBtn status={1} text="처리중" />
            <Home.StatusBtn status={2} text="완료" />
          </Home.StatusHeader>

          <Home.OrderContainer />
        </Home.MainHome>

        {/* 영수증 */}
        <Home.Receipt></Home.Receipt>
      </Home>
    </>
  );
};

export default Order;

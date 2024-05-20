import Home from "./Home";

// 주문관리 가장 상위 컴포넌트
const Order = () => {
  return (
    <>
      <Home defaultStatus={1} defaultReceiveMethod={""} defaultValue={0} setSelectedMenu={{}}>
        <Home.Header />
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

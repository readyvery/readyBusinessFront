import { Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Inventory from "../src/pages/Inventory/Inventory";
import Mypage from "../src/pages/Mypage/Mypage";
import Sales from "../src/pages/Sales/Sales";
import "./App.css";
import Home from "./pages/Home/Home";

function App() {
  return (
    <div className="App">
      <RecoilRoot>
        {/* <Header /> */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Inventory" element={<Inventory />} />
          <Route path="/Sales" element={<Sales />} />
          <Route path="/Mypage" element={<Mypage />} />
        </Routes>

        {/* <Footer /> */}
      </RecoilRoot>
    </div>
  );
}

export default App;

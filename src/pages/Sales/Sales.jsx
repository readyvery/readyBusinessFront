import React from "react";
import NavBar from "../../components/views/NavBar/NavBar";
import MainSales from "./MainSales";

const Sales = () => {
  return (
    <div className="sales-wrapper">
      <nav>
        <NavBar />
      </nav>
      <main>
        <MainSales />
      </main>
    </div>
  );
};

export default Sales;

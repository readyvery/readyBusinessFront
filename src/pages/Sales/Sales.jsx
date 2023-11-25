import React from "react";
import Header from "../../components/views/Header/Header2";
import NavBar from "../../components/views/NavBar/NavBar";
import MainSales from "./MainSales";
import "./Sales.css";

function Sales (props) {
  return (
    <div className="sales-wrapper">
      <Header />
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

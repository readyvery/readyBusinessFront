import React from "react";
import Header from "../../components/views/Header/Header2";
import NavBar from "../../components/views/NavBar/NavBar";
import "./Inventory.css";
import MainInven from "./MainInven";

const Inventory = () => {
  return (
    <div className="inven-wrapper">
      <Header />
        <nav>
          <NavBar />
        </nav>
        <main>
          <MainInven />
        </main>
    </div>
  );
};

export default Inventory;

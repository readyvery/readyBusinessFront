import React from "react";
import NavBar from "../../components/views/NavBar/NavBar";
import "./Inventory.css";
import MainInven from "./MainInven";

const Inventory = () => {
  return (
    <div className="inven-wrapper">
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

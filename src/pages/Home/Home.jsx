import React from "react";
import Header from "../../components/views/Header/Header2";
import NavBar from "../../components/views/NavBar/NavBar";
import "./Home.css";
import MainHome from "./MainHome";
import Receipt from "./Receipt/Receipt";

function Home () {

  return (
    <div className="home-wrapper">
      <Header />
        <nav>
          <NavBar />
        </nav>
        <main>
          <MainHome />
          <Receipt />
        </main>
    </div>
  );
};

export default Home;

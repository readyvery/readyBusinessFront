import React from "react";
import Header from "../../components/views/Header/Header";
import NavBar from "../../components/views/NavBar/NavBar";
import "./Home.css";
import MainHome from "./MainHome";

function Home () {

  return (
    <div className="home-wrapper">
      <Header />
      <nav>
          <NavBar />
        </nav>
        <main>
          <MainHome />
        </main>
    </div>
  );
};

export default Home;

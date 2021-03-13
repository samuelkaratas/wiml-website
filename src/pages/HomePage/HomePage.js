import React from "react";

import "./HomePage.css";

import CarouselComponent from "../../components/carousel/carousel";
import JumbotronComponent from "../../components/jumbotron/jumbotron";
import CardComponent from "../../components/card/card";
import Footer from "../../components/footer/footer";

const HomePage = () => {
  return (
    <div className="home-page-container">
      <JumbotronComponent />
      <div className="cards-container">
        <CardComponent />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;

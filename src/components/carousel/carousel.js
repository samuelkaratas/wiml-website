import React from "react";

import "./carousel.css";

import Carousel from "react-bootstrap/Carousel";

import bgImg from "../../assets/background.png";
import car1 from "../../assets/carousel_img1.png";
import car2 from "../../assets/carousel_img2.png";

const CarouselComponent = () => {
  return (
    <div className="carousel-container">
      <div className="container-fluid">
        <Carousel>
          <Carousel.Item style={{ width: "100%" }}>
            <img
              style={{ width: "100%", margin: "auto" }}
              className="d-block"
              src={car1}
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item style={{ width: "100%" }}>
            <img
              style={{ width: "100%", margin: "auto" }}
              className="d-block"
              src={car2}
              alt="Second slide"
            />
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
};

export default CarouselComponent;

import React from "react";

import "./carousel.css";

import Carousel from "react-bootstrap/Carousel";

import bgImg from "../../assets/background.png";

const CarouselComponent = () => {
  return (
    <div className="carousel-container">
      <div className="container-fluid">
        <Carousel>
          <Carousel.Item style={{ height: "500px" }}>
            <img
              style={{ height: "500px", margin: "auto" }}
              className="d-block"
              src={bgImg}
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item style={{ height: "500px" }}>
            <img
              style={{ height: "500px", margin: "auto" }}
              className="d-block"
              src={bgImg}
              alt="Second slide"
            />
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              style={{ maxHeight: "500px", margin: "auto" }}
              className="d-block"
              src={bgImg}
              alt="Third slide"
            />
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
};

export default CarouselComponent;

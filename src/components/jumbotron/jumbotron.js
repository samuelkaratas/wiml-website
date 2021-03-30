import React from "react";

import "./jumbotron.css";

import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import homepageShotsImage from "../../assets/homepage_shots_image.jpeg";
import CarouselComponent from "../carousel/carousel";

const JumbotronComponent = () => {
  return (
    <Jumbotron fluid className="jumbo-container">
      <div className="jumbo-items">
        <Container style={{ maxWidth: "800px", margin: "5px" }}>
          <h1 style={{ color: "white" }}>Who Is Most Likely</h1>
          <h5 style={{ color: "white" }}>A party game for horrible people</h5>
          <p style={{ color: "white" }}>
            Learn who is most likely to do something horrible among your friends
            and get to see what your friends really think about you!
          </p>
          <p>
            <Button
              variant="info"
              href="https://www.apple.com/tr/app-store/"
              target="_blank"
            >
              Download The App
            </Button>
            <Button style={{ marginLeft: "10px" }} variant="success" href="/">
              Join a party
            </Button>
          </p>
        </Container>
      </div>
      <div className="jumbo-items">
        <CarouselComponent />
      </div>
    </Jumbotron>
  );
};

export default JumbotronComponent;

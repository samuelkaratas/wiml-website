import React from "react";

import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import shotImage from "../../assets/shot-image.jpeg";
import homepageShotsImage from "../../assets/homepage_shots_image.jpeg";

const JumbotronComponent = () => {
  return (
    <Jumbotron
      fluid
      style={{
        display: "flex",
        backgroundImage: `url(${homepageShotsImage})`,
        backgroundSize: "cover",
        height: "600px",
        flexDirection: "column",
        justifyContent: "center",
        opacity: 0.8
      }}
    >
      <Container style={{ maxWidth: '800px', backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <h1 style={{ color: "white" }}>Who Is Most Likely</h1>
        <p style={{ color: "white" }}>A drinking game for horrible people</p>
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
          <Button style={{ marginLeft: "10px" }} variant="success" href="/join">
            Join a party
          </Button>
        </p>
      </Container>
    </Jumbotron>
  );
};

export default JumbotronComponent;

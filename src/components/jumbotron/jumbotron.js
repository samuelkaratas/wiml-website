import React from "react";

import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

import shotImage from '../../assets/shot-image.jpeg'

const JumbotronComponent = () => {
    return (
      <Jumbotron fluid style={{display: 'flex', backgroundImage: `url(${shotImage})`, backgroundSize: 'cover', height: '600px', flexDirection: 'column', justifyContent: 'center'}}>
        <Container>
          <h1 style={{color: 'white'}}>Who Is Most Likely?</h1>
          <p style={{color: 'white'}}>
            That is the million dolor question. Find out who is the most likely person to do something.
          </p>
          <p>
            <Button variant="info" href="https://www.apple.com/tr/app-store/" target="_blank">Download The App</Button>
            <Button style={{marginLeft: '10px'}} variant="success" href="/join">Join a party</Button>
          </p>
        </Container>
      </Jumbotron>
    );
};

export default JumbotronComponent;

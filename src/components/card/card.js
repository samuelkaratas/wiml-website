import React from "react";

import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import Badge from "react-bootstrap/Badge";

import partyImage from "../../assets/party-image.png";
import expansionImage from "../../assets/modes.png";
import modesImage from "../../assets/game-modes.png";

const CardComponent = () => {
  return (
    <CardDeck>
      <Card style={{ backgroundColor: "transparent" }}>
        <Card.Img
          variant="top"
          src={partyImage}
          style={{ maxWidth: "126px", alignSelf: "center", marginTop: "10px" }}
        />
        <Card.Body>
          <Card.Title style={{ color: "white" }}>Get Drunk, Fast!</Card.Title>
          <Card.Text style={{ color: "white" }}>
            Every minute someone will have a shot, so it won’t take too long
            time to get wasted.
          </Card.Text>
        </Card.Body>
      </Card>
      <Card style={{ backgroundColor: "transparent" }}>
        <Card.Img
          variant="top"
          src={expansionImage}
          style={{ maxWidth: "126px", alignSelf: "center", marginTop: "10px" }}
        />
        <Card.Body>
          <Card.Title style={{ color: "white" }}>
            Share Your Wildest Memories!
          </Card.Title>
          <Card.Text style={{ color: "white" }}>
            Every question is a great conversation starter! Take your time to
            share your similar memories in between questions!
          </Card.Text>
        </Card.Body>
      </Card>
      <Card style={{ backgroundColor: "transparent" }}>
        <Card.Img
          variant="top"
          src={modesImage}
          style={{ maxWidth: "126px", alignSelf: "center", marginTop: "10px" }}
        />
        <Card.Body>
          <Card.Title style={{ color: "white" }}>
            One Person Gets The App, Hundreds Party With It!
          </Card.Title>
          <Card.Text style={{ color: "white" }}>
            Once you get the app you can create unlimited parties with up to 25
            people!
          </Card.Text>
        </Card.Body>
      </Card>
    </CardDeck>
  );
};

export default CardComponent;

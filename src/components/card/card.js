import React from "react";

import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import Badge from 'react-bootstrap/Badge'

import partyImage from '../../assets/party-image.png'
import expansionImage from '../../assets/modes.png'
import modesImage from '../../assets/game-modes.png'

const CardComponent = () => {
    return (
        <CardDeck>
            <Card style={{backgroundColor: 'transparent'}}>
                <Card.Img variant="top" src={partyImage} style={{maxWidth: '126px', alignSelf: 'center', marginTop: '10px'}} />
                <Card.Body>
                    <Card.Title style={{color: 'white'}}>Create Parties</Card.Title>
                    <Card.Text style={{color: 'white'}}>
                        This is a wider card with supporting text below as a natural lead-in to
                        additional content. This content is a little bit longer.
      </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">Last updated 3 mins ago</small>
                </Card.Footer>
            </Card>
            <Card style={{backgroundColor: 'transparent'}}>
                <Card.Img variant="top" src={expansionImage} style={{maxWidth: '126px', alignSelf: 'center', marginTop: '10px'}} />
                <Card.Body>
                    <Card.Title style={{color: 'white'}}>Expansions</Card.Title>
                    <Card.Text style={{color: 'white'}}>
                        This card has supporting text below as a natural lead-in to additional
        content.{' '}
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">Last updated 3 mins ago</small>
                </Card.Footer>
            </Card>
            <Card style={{backgroundColor: 'transparent'}}>
                <Card.Img variant="top" src={modesImage} style={{maxWidth: '126px', alignSelf: 'center', marginTop: '10px'}} />
                <Card.Body>
                    <Card.Title style={{color: 'white'}}>Game Modes <Badge pill variant="info">SOON</Badge></Card.Title>
                    <Card.Text style={{color: 'white'}}>
                        This is a wider card with supporting text below as a natural lead-in to
                        additional content. This card has even longer content than the first to
                        show that equal height action.
      </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">Last updated 3 mins ago</small>
                </Card.Footer>
            </Card>
        </CardDeck>
    );
};

export default CardComponent;

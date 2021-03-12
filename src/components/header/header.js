import React from "react";

import "./header.css";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header-container">
      <Navbar collapseOnSelect expand="lg" bg="transparent" variant="light">
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown title="Follow Us" id="collasible-nav-dropdown">
              <NavDropdown.Item href="https://twitter.com/whoismostlikely" target="_blank">Twitter</NavDropdown.Item>
              <NavDropdown.Item href="https://www.instagram.com/whoismostlikely" target="_blank">
                Instagram
              </NavDropdown.Item>
              <NavDropdown.Item href="https://www.facebook.com/" target="_blank">Facebook</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="https://www.apple.com/tr/app-store/" target="_blank">Download the app</Nav.Link>
            <Nav.Link eventKey={2} href="/join">
              Join a party
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;

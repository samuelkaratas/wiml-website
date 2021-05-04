import React from "react";

import "./header.css";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

import { useDispatch, useSelector } from "react-redux";

import { Link, useHistory } from "react-router-dom";

import {
  setPartyIdRedux,
  setUserId,
  setIsAdmin,
  setGameStarted,
  resetUsers,
  setNumberOfPeopleAnswered,
  setShowLeaderboard,
  setQuestionNumber,
  setJoining,
} from "../../redux/game/game-actions";

import {
  selectUsers,
  selectPartyId,
  selectUserId,
  selectIsAdmin,
  selectNumberOfPeopleAnswered,
  selectShowLeaderboard,
  selectQuestionNumber,
} from "../../redux/game/game-selectors";

import {
  detachJoinedListener,
  detachStartedListener,
  detachAnsweredListener,
  detachQuestionNumberListener,
  updateNumberOfPeopleAnswered,
  setupAnsweredListener,
  updateUsers,
  resetNumberOfAnswered,
  resetScore,
  setupShowLeaderboardListener,
  changeShowLeaderboard,
  detachShowLeaderboardListener,
  updateQuestionNumber,
  setupQuestionNumberListener,
  getQuestionText,
  removeUserFromFirebase,
} from "../../firebase/firebase";

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const users = useSelector(selectUsers);
  const isAdmin = useSelector(selectIsAdmin);
  const partyId = useSelector(selectPartyId);
  const userId = useSelector(selectUserId);
  const showLeaderboard = useSelector(selectShowLeaderboard);
  const questionNumber = useSelector(selectQuestionNumber);

  const numOfAnswered = useSelector(selectNumberOfPeopleAnswered);

  const leavePartyClick = async () => {
    const user = users.filter((user) => user.key === userId);

    detachJoinedListener(partyId);
    detachStartedListener(partyId);
    detachAnsweredListener(partyId);
    detachShowLeaderboardListener(partyId);
    detachQuestionNumberListener(partyId);
    removeUserFromFirebase(partyId, userId);

    if (user[0].imageUrl) {
      const requestOptions = {
        mode: "cors",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl: `${user[0].imageUrl}` }),
      };

      const res = await fetch(
        "https://pacific-wave-19073.herokuapp.com/deleteImage",
        requestOptions
      );
      const resJson = await res.json();
      console.log(resJson);
    }

    dispatch(setPartyIdRedux(null));
    dispatch(setUserId(0));
    dispatch(setIsAdmin(null));
    dispatch(resetUsers());
    dispatch(setGameStarted(false));
    dispatch(setNumberOfPeopleAnswered(0));
    dispatch(setShowLeaderboard(false));
    dispatch(setQuestionNumber(0));
    dispatch(setJoining(false));
    history.push("/home");
  };

  return (
    <div style={{ position: "sticky", top: 0, zIndex: 1 }}>
      {!partyId ? (
        <Navbar
          collapseOnSelect
          expand="lg"
          style={{ backgroundColor: "rgba(136,197,220,0.7)" }}
          variant="light"
          sticky="top"
        >
          <Navbar.Brand href="/home">Home</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <NavDropdown title="Follow Us" id="collasible-nav-dropdown">
                <NavDropdown.Item
                  href="https://twitter.com/whoismostlikely"
                  target="_blank"
                >
                  Twitter
                </NavDropdown.Item>
                <NavDropdown.Item
                  href="https://www.instagram.com/whoismostlikely"
                  target="_blank"
                >
                  Instagram
                </NavDropdown.Item>
                <NavDropdown.Item
                  href="https://www.facebook.com/"
                  target="_blank"
                >
                  Facebook
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link
                href="https://www.apple.com/tr/app-store/"
                target="_blank"
              >
                Download the app
              </Nav.Link>
              <Nav.Link eventKey={2} href="/">
                Join a party
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      ) : (
        <Navbar
          collapseOnSelect
          expand="lg"
          bg="transparent"
          variant="light"
          sticky="top"
        >
          <Nav className="ml-auto">
            <Nav.Link onClick={leavePartyClick}>Leave Party</Nav.Link>
          </Nav>
        </Navbar>
      )}
    </div>
  );
};

export default Header;

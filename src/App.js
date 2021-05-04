import React from "react";

import "./App.css";

import { Switch, Route, Redirect } from "react-router-dom";

import Header from "./components/header/header";

import GamePage from "./pages/GamePage/GamePage";
import JoinPartyPage from "./pages/JoinPartyPage/JoinPartyPage";
import LobbyPage from "./pages/LobbyPage/LobbyPage";
import HomePage from "./pages/HomePage/HomePage";

import { useSelector } from "react-redux";

import { selectPartyId, selectUserId } from "./redux/game/game-selectors";

function App() {
  const userId = useSelector(selectUserId);
  const partyId = useSelector(selectPartyId);

  return (
    <div className="App">
      <Header />
      <Switch className="switchContainer">
        <Route exact path="/home">
          <HomePage />
        </Route>
        <Route exact path="/game/:pid">
          {!partyId ? <Redirect to="/home" /> : <GamePage />}
        </Route>
        <Route exact path="/">
          <JoinPartyPage />
        </Route>
        <Route exact path="/lobby/:pid">
          {!partyId ? <Redirect to="/home" /> : <LobbyPage />}
        </Route>
      </Switch>
    </div>
  );
}

export default App;

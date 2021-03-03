import React from "react";

import "./App.css";

import { Switch, Route, Redirect } from "react-router-dom";

import Header from "./components/header/header";

import GamePage from "./pages/GamePage/GamePage";
import JoinPartyPage from "./pages/JoinPartyPage/JoinPartyPage";
import LobbyPage from "./pages/LobbyPage/LobbyPage";
import HomePage from "./pages/HomePage/HomePage";

function App() {
  return (
    <div className="App">
      <Header />
      <Switch className="switchContainer">
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/game/:pid">
          <GamePage />
        </Route>
        <Route exact path="/join">
          <JoinPartyPage />
        </Route>
        <Route exact path="/lobby/:pid">
          <LobbyPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;

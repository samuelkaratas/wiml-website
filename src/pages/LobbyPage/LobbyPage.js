import React, { useEffect } from "react";

import "./LobbyPage.css";

import userPhotoPlaceholder from "../../assets/user-profile2.webp";
import qrCode from "../../assets/frame.png";

import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  selectUsers,
  selectPartyId,
  selectUserId,
  selectIsAdmin,
  selectStarted,
  selectJoining,
} from "../../redux/game/game-selectors";

import {
  setupSignoutListener,
  detachJoinedListener,
  detachStartedListener,
  detachAnsweredListener,
  detachShowLeaderboardListener,
  detachQuestionNumberListener,
  removeUserFromFirebase,
} from "../../firebase/firebase";

import {
  resetUsers,
  setGameStarted,
  setIsAdmin,
  setJoining,
  setNumberOfPeopleAnswered,
  setPartyIdRedux,
  setQuestionNumber,
  setShowLeaderboard,
  setUserId,
} from "../../redux/game/game-actions";

const LobbyPage = () => {
  let { pid } = useParams();
  console.log(pid);
  const history = useHistory();
  const dispatch = useDispatch();

  const users = useSelector(selectUsers);
  const partyId = useSelector(selectPartyId);
  const isAdmin = useSelector(selectIsAdmin);
  const started = useSelector(selectStarted);
  const userId = useSelector(selectUserId);
  const joining = useSelector(selectJoining);

  useEffect(() => {
    setupSignoutListener(partyId, userId)(dispatch, history);
  }, []);

  useEffect(() => {
    if (started) {
      history.push(`/game/${partyId}`);
    }
  }, [started]);

  const startPartyClickHandler = () => {
    console.log("asdvgsdv");
  };

  useEffect(() => {
    window.addEventListener("beforeunload", alertUser);
    window.addEventListener("unload", handleTabClosing);
    window.addEventListener("popstate", handlePopstate);
    return () => {
      window.removeEventListener("beforeunload", alertUser);
      window.removeEventListener("unload", handleTabClosing);
      window.removeEventListener("popstate", handlePopstate);
    };
  });

  const handlePopstate = () => {
    history.go(1);
  };

  const handleTabClosing = () => {
    detachJoinedListener(partyId);
    detachStartedListener(partyId);
    detachAnsweredListener(partyId);
    detachShowLeaderboardListener(partyId);
    detachQuestionNumberListener(partyId);
    removeUserFromFirebase(partyId, userId);
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

  const alertUser = (event) => {
    event.preventDefault();
    event.returnValue = "Are you sure you want to leave the game?";
  };

  return (
    <div className={"lobbyContainer"}>
      <div className={"textContainer"}>
        {joining ? (
          <p className={"lobbyText"}>Joining the party</p>
        ) : (
          <div className="innerTextQrContainer">
            <p className={"lobbyText"}>
              Your friends can go to whoismostlikely.com or scan the qr code
              below and enter the party id: {partyId} to join your party
            </p>
            <img className={"qrCode"} src={qrCode} />
          </div>
        )}
      </div>
      {!joining ? (
        <div className={"flatlist"}>
          {users.map((item) => (
            <div className={"flatlistContainer"} key={item.key}>
              <div className={"imageAndNameContainer"}>
                <div className={"imageContainer"}>
                  <img
                    className={"image"}
                    src={item.imageUrl ? item.imageUrl : userPhotoPlaceholder}
                  />
                </div>
                <p className={"username"}>{item.name}</p>
              </div>
              {isAdmin ? (
                <div onClick={() => console.log(`Remove = ${item.name}`)}>
                  R
                </div>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}
      {isAdmin ? (
        <div onClick={startPartyClickHandler} className={"pressable"}>
          <p className={"text"}>Start The Party</p>
        </div>
      ) : null}
    </div>
  );
};

export default LobbyPage;

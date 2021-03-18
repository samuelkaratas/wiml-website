import React, { useEffect } from "react";

import "./LobbyPage.css";

import userPhotoPlaceholder from "../../assets/user-profile2.webp";
import qrCode from "../../assets/frame.png";

import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  selectUsers,
  selectPartyId,
  selectIsAdmin,
  selectStarted,
  selectUserId,
  selectJoining,
} from "../../redux/game/game-selectors";

import { setupSignoutListener } from "../../firebase/firebase";

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
    setupSignoutListener(partyId)(dispatch, history);
  }, []);

  useEffect(() => {
    if (started) {
      history.push(`/game/${partyId}`);
    }
  }, [started]);

  const startPartyClickHandler = () => {
    console.log("asdvgsdv");
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

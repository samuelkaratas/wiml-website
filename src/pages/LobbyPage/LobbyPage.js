import React, { useEffect } from "react";

import "./LobbyPage.css";
import userPhotoPlaceholder from "../../assets/user-profile2.webp";

import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  selectUsers,
  selectPartyId,
  selectIsAdmin,
  selectStarted,
  selectUserId,
} from "../../redux/game/game-selectors";

import {
  setupSignoutListener,
} from "../../firebase/firebase";

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
  /*const users = [
    {
      isAdmin: true,
      key: "0",
      name: "Sam",
      score: 0,
    },
    {
      isAdmin: false,
      key: "1",
      name: "Simon",
      score: 0,
    },
    {
      isAdmin: false,
      key: "2",
      name: "Joanna",
      score: 0,
    },
  ];*/

  useEffect(() => {
    console.log("users");
    console.log(users);
    setupSignoutListener(partyId)(dispatch, history);
  }, []);

  useEffect(() => {
    console.log(started);
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
        <p className={"lobbyText"}>
          Your friends can join using the party id: {partyId}
        </p>
      </div>
      <div className={"flatlist"}>
        {users.map((item) => (
          <div className={"flatlistContainer"} key={item.key}>
            <div className={"imageAndNameContainer"}>
              <div className={"imageContainer"}>
                <img className={"image"} src={item.imageUrl ? item.imageUrl : userPhotoPlaceholder} />
              </div>
              <p className={"username"}>{item.name}</p>
            </div>
            {isAdmin ? (
              <div onClick={() => console.log(`Remove = ${item.name}`)}>R</div>
            ) : null}
          </div>
        ))}
      </div>
      {isAdmin ? (
        <div onClick={startPartyClickHandler} className={"pressable"}>
          <p className={"text"}>Start The Party</p>
        </div>
      ) : null}
    </div>
  );
};

export default LobbyPage;

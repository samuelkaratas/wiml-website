import React, { useState, useEffect } from "react";

import "./GamePage.css";

import UserSelectionList from "../../components/userSelectionList/userSelectionList";
import QuestionBox from "../../components/questionBox/questionBox";
import LeaderboardList from "../../components/leaderboardList/leaderboardList";

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  setPartyIdRedux,
  setUserId,
  setIsAdmin,
  setGameStarted,
  resetUsers,
  setNumberOfPeopleAnswered,
  setShowLeaderboard,
  setQuestionNumber,
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

const GamePage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const users = useSelector(selectUsers);
  const isAdmin = useSelector(selectIsAdmin);
  const partyId = useSelector(selectPartyId);
  const userId = useSelector(selectUserId);
  const showLeaderboard = useSelector(selectShowLeaderboard);
  const questionNumber = useSelector(selectQuestionNumber);

  const numOfAnswered = useSelector(selectNumberOfPeopleAnswered);

  const [highscore, setHighscore] = useState(null);
  const [array, setArray] = useState(null);
  const [questionText, setQuestionText] = useState(null);
  const [selected, setSelected] = useState(false);

  const nextClicked = async () => {
    console.log("next Clicked");
  };

  const userClicked = (item) => {
    console.log(item);
    updateNumberOfPeopleAnswered(partyId, item.key);
    setSelected(true);
  };

  useEffect(() => {
    const runFunction = async () => {
      console.log("questionNumber" + questionNumber);
      const returnedObject = await getQuestionText(questionNumber);
      setQuestionText(returnedObject.questionText);
    };

    runFunction();
  }, [questionNumber]);

  useEffect(() => {
    console.log("showLeaderboard" + showLeaderboard);
    if (showLeaderboard) {
      updateUsers(partyId)(dispatch).then((returnedArray) => {
        console.log("returnedArray " + returnedArray);
        if (returnedArray.length) {
          const filteredArray = returnedArray.filter((val) => val.score !== 0);
          filteredArray.sort((a, b) => b.score - a.score);
          setHighscore(filteredArray[0].score);
          setArray(filteredArray);
        }
      });
    } else {
      if (isAdmin) {
        resetNumberOfAnswered(partyId);
        updateQuestionNumber(partyId);
      }
      resetScore(partyId, userId);
      setHighscore(null);
      setArray(null);
      setSelected(false);
    }
  }, [showLeaderboard]);

  useEffect(() => {
    if (numOfAnswered === users.length) {
      nextClicked();
    }
  }, [numOfAnswered]);

  useEffect(() => {
    setupAnsweredListener(partyId)(dispatch);
    setupShowLeaderboardListener(partyId)(dispatch);
    setupQuestionNumberListener(partyId)(dispatch);
  }, []);

  const logout = () => {
    console.log("log out");
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
    history.push("/join");
  };

  return (
    <div className={"gameContainer"}>
      <div onClick={logout} className={"logoutButton"}>
        <p className={"text"}>Log out</p>
      </div>
      <QuestionBox question={questionText ? questionText : "Loading..."} />
      {!showLeaderboard ? (
        !selected ? (
          <UserSelectionList
            data={users}
            onPress={(clickedUserItem) => {
              userClicked(clickedUserItem);
            }}
          />
        ) : (
          <p className={"answeredText"}>Waiting for others...</p>
        )
      ) : (
        <LeaderboardList array={array} highscore={highscore} />
      )}

      {isAdmin ? (
        <div onClick={nextClicked} className={"nextButton"}>
          {!showLeaderboard ? (
            <p className={"nextButtonText"}>
              {numOfAnswered}/{users.length}
            </p>
          ) : null}
          N
        </div>
      ) : !showLeaderboard ? (
        <div className={"nextButton"}>
          <p className={"nextButtonText"}>
            {numOfAnswered}/{users.length}
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default GamePage;

import React, { useState, useEffect } from "react";

import "./GamePage.css";

import UserSelectionList from "../../components/userSelectionList/userSelectionList";
import QuestionBox from "../../components/questionBox/questionBox";
import LeaderboardList from "../../components/leaderboardList/leaderboardList";

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

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
  updateNumberOfPeopleAnswered,
  setupAnsweredListener,
  updateUsers,
  resetNumberOfAnswered,
  resetScore,
  setupShowLeaderboardListener,
  updateQuestionNumber,
  setupQuestionNumberListener,
  getQuestionText,
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
  const [skipped, setSkipped] = useState(false);

  const userClicked = (item) => {
    //console.log(item);
    updateNumberOfPeopleAnswered(partyId, item.key);
    setSelected(true);
  };

  useEffect(() => {
    let unmounted = false;
    const runFunction = async () => {
      //console.log("questionNumber" + questionNumber);
      const returnedObject = await getQuestionText(questionNumber);
      setQuestionText(returnedObject.questionText);
    };

    if (!unmounted) {
      runFunction();
    }

    return () => {
      unmounted = true;
    };
  }, [questionNumber]);

  useEffect(() => {
    let unmounted = false;

    if (!unmounted) {
      if (showLeaderboard) {
        updateUsers(partyId)(dispatch).then((returnedArray) => {
          //console.log("returnedArray " + returnedArray);
          if (returnedArray.length) {
            const filteredArray = returnedArray.filter(
              (val) => val.score !== 0
            );
            if (filteredArray.length) {
              filteredArray.sort((a, b) => b.score - a.score);
              setHighscore(filteredArray[0].score);
              setArray(filteredArray);
            } else {
              setSkipped(true);
            }
          }
        });
      } else {
        resetScore(partyId, userId);
        setHighscore(null);
        setArray(null);
        setSelected(false);
        setSkipped(false);
      }
    }

    return () => {
      unmounted = true;
    };
  }, [showLeaderboard]);

  useEffect(() => {
    setupAnsweredListener(partyId)(dispatch);
    setupShowLeaderboardListener(partyId)(dispatch);
    setupQuestionNumberListener(partyId)(dispatch);
  }, []);

  useEffect(() => {
    window.addEventListener("beforeunload", alertUser);
    window.addEventListener("unload", handleTabClosing);
    return () => {
      window.removeEventListener("beforeunload", alertUser);
      window.removeEventListener("unload", handleTabClosing);
    };
  });

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
    <div className={"gameContainer"}>
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
      ) : skipped ? (
        <p className={"answeredText"}>Host skipped the question</p>
      ) : (
        <LeaderboardList array={array} highscore={highscore} />
      )}

      {!showLeaderboard ? (
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

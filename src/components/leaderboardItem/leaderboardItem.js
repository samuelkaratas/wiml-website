import React, { useEffect, useState } from "react";

import "./leaderboardItem.css";

import userPhotoPlaceholder from "../../assets/user-profile2.webp";
import champImage from "../../assets/champion_cup.webp";
/*
import shotGif1 from "../../assets/tenor.gif";
import shotGif2 from "../../assets/tenor-2.gif";
import shotGif3 from "../../assets/tenor-3.gif";
import shotGif4 from "../../assets/tenor-4.gif";
import shotGif5 from "../../assets/tenor-5.gif";*/

const LeaderboardItem = ({ username, score, imageUrl, isDrinking }) => {
  //const randomGif = Math.floor(Math.random() * 5);
  //const gifArray = [shotGif1,shotGif2,shotGif3,shotGif4,shotGif5]

  return (
    <div className={"leaderboardContainer"}>
      <div className={"leaderboardImageContainer"}>
        <img className={"image"} src={imageUrl ? imageUrl : userPhotoPlaceholder} />
      </div>
      <p className={"leaderboardUsername"}>{username}</p>
      {isDrinking ? (
        <div className={"drinkGifContainer"}>
          <img className={"image"} src={champImage} />
        </div>
      ) : null}
      <p className={"leaderboardScore"}>{score}</p>
    </div>
  );
};

export default LeaderboardItem;

import React, { useEffect, useState } from "react";

import "./leaderboardItem.css";

import userPhotoPlaceholder from "../../assets/user-profile2.webp";
import shotGif from "../../assets/tenor-2.gif";

const LeaderboardItem = ({ username, score, imageUrl, isDrinking }) => {
  return (
    <div className={"leaderboardContainer"}>
      <div className={"leaderboardImageContainer"}>
        <img className={"image"} src={userPhotoPlaceholder} />
      </div>
      {isDrinking ? (
        <div className={"drinkGifContainer"}>
          <img className={"image"} src={shotGif} />
        </div>
      ) : null}
      <p className={"leaderboardUsername"}>{username}</p>
      <p className={"leaderboardScore"}>{score}</p>
    </div>
  );
};

export default LeaderboardItem;

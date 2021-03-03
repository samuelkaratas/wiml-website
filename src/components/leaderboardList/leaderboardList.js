import React from "react";

import "./leaderboardList.css";

import LeaderboardItem from "../leaderboardItem/leaderboardItem";

const LeaderboardList = ({ array, highscore }) => {
  return (
    <div className={"leaderboardFlatlist"}>
      {array ? (array.map((item) => (
        <LeaderboardItem
          username={item.name}
          imageUrl={item.imageUrl}
          score={item.score}
          isDrinking={item.score === highscore ? true : false}
          key={item.key}
        />
      ))) : null}
    </div>
  );
};

export default LeaderboardList;

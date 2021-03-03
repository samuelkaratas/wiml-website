import React from "react";

import "./userSelectionList.css";

import UserButton from "../userButton/userButton";

const UserSelectionList = ({ data, onPress }) => {
  return (
    <div className={"userFlatlist"}>
      {data.map((item) => (
        <UserButton
          onPress={() => {
            onPress(item);
          }}
          username={item.name}
          imageUrl={item.imageUrl}
          key={item.key}
        />
      ))}
    </div>
  );
};

export default UserSelectionList;

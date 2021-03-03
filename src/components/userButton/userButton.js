import React from "react";

import "./userButton.css";

import userPhotoPlaceholder from "../../assets/user-profile2.webp";

const UserButton = ({ onPress, username, imageUrl }) => {
  return (
    <div onClick={onPress} className={"userButtonContainer"}>
      <div className={"userButtonImageContainer"}>
        <img className={"image"} src={userPhotoPlaceholder} />
      </div>
      <p className={"username"}>{username}</p>
    </div>
  );
};

export default UserButton;

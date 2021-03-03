import React from "react";

import "./customButton.css";

const CustomButton = ({ children, onPress }) => (
  <div className="button" onClick={onPress}>
    <p className="button-text">{children}</p>
  </div>
);

export default CustomButton;

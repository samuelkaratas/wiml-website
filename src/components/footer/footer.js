import React from "react";

import "./footer.css";

var style = {
  backgroundColor: "transparent",
  borderTop: "1px solid white",
  textAlign: "center",
  padding: "20px",
  left: "0",
  bottom: "60px",
  height: "60px",
  width: "100%",
};

var phantom = {
  display: "block",
  padding: "20px",
  height: "60px",
  width: "100%",
};

const Footer = ({ children }) => {
  return (
    <div>
      <div style={phantom} />
      <div style={style}>
        <p style={{ color: "white" }}>Created With Love</p>
      </div>
    </div>
  );
};

export default Footer;

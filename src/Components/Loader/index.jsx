import React from "react";
import "./index.css";

const Loader = ({ size = 50, color = "#8a4fff" }) => {
  return (
    <div className="loader-container">
      <div
        className="spinner"
        style={{
          width: size,
          height: size,
          borderTopColor: color,
        }}
      ></div>
    </div>
  );
};

export default Loader;
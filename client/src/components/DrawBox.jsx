import React, { createRef, useState, useEffect } from "react";

const videoConstraints = {
  width: 350,
  height: 350,
  facingMode: "user",
};

const DrawBox = ({ detection }) => {
  if (!detection) return null;
  let _H = detection.box.height;
  let _W = detection.box.width;
  let _X = detection.box._x;
  let _Y = detection.box._y;
  return (
    <div
      style={{
        position: "absolute",
        border: "solid",
        borderColor: "blue",
        height: _H,
        width: _W,
        transform: `translate(${_X}px,${_Y}px)`,
      }}
    ></div>
  );
};

export default DrawBox;

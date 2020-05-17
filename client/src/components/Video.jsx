import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";

const Video = ({ onCapture, isCapturing, interval = 1000 }) => {
  const webcam = useRef();
  let captureInterval;

  useEffect(() => {
    if (isCapturing) {
      capture();
      if (captureInterval) clearInterval(captureInterval);
      captureInterval = window.setInterval(() => capture(), interval);
    }
    return () => clearInterval(captureInterval);
  }, [isCapturing]);

  const capture = () => {
    if (webcam.current && isCapturing)
      return onCapture(webcam.current.getScreenshot());
  };

  return <Webcam audio={false} ref={webcam} screenshotFormat="image/jpeg" />;
};

export default Video;

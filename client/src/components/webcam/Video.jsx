import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import Webcam from "react-webcam";

const Video = ({ onCapture, isCapturing, interval = 1000 }) => {
  const webcam = useRef();

  useEffect(() => {
    let captureInterval;
    const capture = () => {
      if (webcam.current && isCapturing)
        return onCapture(webcam.current.getScreenshot());
    };

    if (isCapturing) {
      capture();
      if (captureInterval) clearInterval(captureInterval);
      captureInterval = window.setInterval(() => capture(), interval);
    }
    // cleanup
    return () => clearInterval(captureInterval);
  }, [isCapturing, interval, onCapture]);

  return <Webcam audio={false} ref={webcam} screenshotFormat="image/jpeg" />;
};

Video.propTypes = {
  interval: PropTypes.number,
  isCapturing: PropTypes.bool.isRequired,
  onCapture: PropTypes.func.isRequired,
};

export default Video;

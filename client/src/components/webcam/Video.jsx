import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import Webcam from "react-webcam";

/**
 * THIS CODE HAS NOT BEEN REFACTORED FROM PREVIOUS VERSION
 * Returns video component that detects face in view.
 * @function Video
 * @param {func} onCapture - called when screenshot of webcam captured.
 * @param {bool} isCapturing - to be capturing or not to be capturing.
 * @param {integer} interval - interval of face detection screenshot, defaults to 1 second.
 * @returns {Webcam}
 */
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

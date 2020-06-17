import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import classnames from "../../utils/classnames";
import { faceDetected, loadModels } from "../../utils/face";
import Video from "./Video";

/**
 * THIS CODE HAS NOT BEEN REFACTORED FROM PREVIOUS VERSION
 * Returns camera component that detects face in view.
 * @function CameraFaceDetector
 * @param {func} onDetectionChange - called when there is a change in whether a face is or isn't detected.
 * @returns {div}``
 */
const CameraFaceDetector = ({ onDetectionChange }) => {
  const [isActive, setIsActive] = useState(null);
  const [isDetecting, setIsDetecting] = useState(false);

  useEffect(() => {
    // models for face detection
    loadModels();
  }, []);

  useEffect(() => {
    if (onDetectionChange) onDetectionChange(isActive && isDetecting);
  }, [isActive, isDetecting, onDetectionChange]);

  const processScreenshot = (img) => {
    faceDetected(img).then((detected) => setIsActive(isDetecting && detected));
  };

  const toggleDetection = () => {
    if (isActive) setIsActive(null);
    setIsDetecting(!isDetecting);
  };

  return (
    <div>
      <div
        className={classnames("video", {
          active: isActive,
          inactive: isDetecting && !isActive,
        })}
        onClick={toggleDetection}
      >
        <Video
          onCapture={processScreenshot}
          isCapturing={isDetecting}
          className="video-component"
        />
        <div className={classnames("video-overlay", { dark: !isDetecting })}>
          <span className="overlay-text">START</span>
        </div>
      </div>
    </div>
  );
};

CameraFaceDetector.propTypes = {
  onDetectionChange: PropTypes.func.isRequired,
};

export default CameraFaceDetector;

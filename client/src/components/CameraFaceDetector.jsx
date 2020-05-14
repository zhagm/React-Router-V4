import React, { useState, useEffect } from "react";
import Video from "./Video";
import { faceDetected, loadModels } from "../utils/face";
import classnames from "../utils/classnames";
import { Button } from "reactstrap";

const videoConstraints = {
  width: "auto",
  height: undefined,
  facingMode: "user",
};

const CameraFaceDetector = ({ onDetectionChange = () => {} }) => {
  // true if face detected in camera, false if not
  const [isActive, setIsActive] = useState(null);
  const [isDetecting, setIsDetecting] = useState(false);

  useEffect(() => {
    loadModels();
  }, []);

  useEffect(() => {
    loadModels();
  }, [isDetecting, isActive]);

  useEffect(() => {
    onDetectionChange(isActive && isDetecting);
  }, [isActive]);

  const processScreenshot = (img) => {
    faceDetected(img).then((detected) => {
      if (!isDetecting) detected = false;
      setIsActive(detected);
    });
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
      >
        <Video
          onCapture={processScreenshot}
          isCapturing={isDetecting}
          interval={2000}
          videoConstraints={videoConstraints}
        />
      </div>
      <div>
        <Button className="mt-1" onClick={toggleDetection}>
          {isDetecting ? "Stop camera" : "Start camera"}
        </Button>
      </div>
    </div>
  );
};

export default CameraFaceDetector;

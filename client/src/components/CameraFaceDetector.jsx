import React, { useState, useEffect } from "react";
import Video from "./Video";
import { faceDetected, loadModels } from "../utils/face";

const videoConstraints = {
  width: "auto",
  height: undefined,
  facingMode: "user",
};

const CameraFaceDetector = () => {
  const [atDesk, setAtDesk] = useState(null);
  const [isDetecting, setIsDetecting] = useState(false);

  useEffect(() => {
    loadModels();
  }, []);

  useEffect(() => {
    loadModels();
  }, [isDetecting, atDesk]);

  const processScreenshot = (img) => {
    faceDetected(img).then((detected) => {
      if (!isDetecting) detected = false;
      setAtDesk(detected);
    });
  };

  const toggleDetection = () => {
    if (atDesk) setAtDesk(null);
    setIsDetecting(!isDetecting);
  };

  return (
    <div>
      <div
        className={`video ${
          atDesk ? "active" : atDesk === false ? "inactive" : ""
        }`}
      >
        <Video
          onCapture={processScreenshot}
          isCapturing={isDetecting}
          interval={2000}
          videoConstraints={videoConstraints}
        />
      </div>
      <div>
        <button onClick={toggleDetection}>
          {isDetecting ? "Stop camera" : "Start camera"}
        </button>
      </div>
    </div>
  );
};

export default CameraFaceDetector;

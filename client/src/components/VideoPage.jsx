import React, { useState, useEffect } from "react";
import DrawBox from "./DrawBox";
import Video from "./Video";
import { getFaceDetection, loadModels } from "../utils/face";

const videoConstraints = {
  width: undefined,
  height: undefined,
  facingMode: "user",
};

const VideoPage = () => {
  const [detection, setDetection] = useState(null);
  const [isDetecting, setIsDetecting] = useState(false);

  useEffect(() => {
    loadModels();
  }, []);

  const processScreenshot = (img) => {
    getFaceDetection(img).then((data) => {
      if (data && data.detection && isDetecting) setDetection(data.detection);
    });
  };

  const toggleDetection = () => {
    if (detection) setDetection(false);
    setIsDetecting(!isDetecting);
  };

  console.log(detection, isDetecting);

  return (
    <div>
      <div className={`video ${detection ? "active" : ""}`}>
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

export default VideoPage;

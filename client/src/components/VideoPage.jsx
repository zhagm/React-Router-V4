import React, { useState, useEffect } from "react";
import DrawBox from "./DrawBox";
import Video from "./Video";
import { getFaceDetection, loadModels } from "../utils/face";

const videoConstraints = {
  width: 350,
  height: 350,
  facingMode: "user",
};

const VideoPage = () => {
  const [detection, setDetection] = useState(null);
  const [isDetecting, setIsDetecting] = useState(false);

  useEffect(() => {
    loadModels();
  }, []);

  const processScreenshot = (img) => {
    getFaceDetection(img).then((detection) => {
      setDetection(detection);
    });
  };

  const toggleDetection = () => {
    setIsDetecting(!isDetecting);
  };

  console.log(detection);

  return (
    <div
      className="Camera"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: videoConstraints.width,
          height: videoConstraints.height,
        }}
      >
        <div style={{ position: "relative", width: videoConstraints.width }}>
          <div style={{ position: "absolute" }}>
            <Video
              onCapture={processScreenshot}
              isCapturing={isDetecting}
              interval={500}
            />
          </div>
          {/* <DrawBox detection={detection} /> */}
        </div>
      </div>
      <button onClick={toggleDetection}>
        {isDetecting ? "Stop camera" : "Start camera"}
      </button>
    </div>
  );
};

export default VideoPage;

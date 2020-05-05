import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import DrawBox from "./DrawBox";
import { getFaceDetection, loadModels } from "../api/face";

const videoConstraints = {
  width: 350,
  height: 350,
  facingMode: "user",
};

const Video = ({ continuousMode = true }) => {
  const webcam = useRef();
  const [detection, setDetection] = useState(null);

  useEffect(() => {
    loadModels();
  }, []);

  const capture = () => {
    if (!webcam.current) return;
    const screenshot = webcam.current.getScreenshot();
    getFaceDetection(screenshot).then((data) => {
      if (data && data.detection) console.log(data.detection);
    });
    if (continuousMode) window.setTimeout(() => capture(), 1500);
  };

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
            <Webcam
              audio={false}
              ref={webcam}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
            />
          </div>
          <DrawBox detection={detection} />
        </div>
      </div>
      <button onClick={capture}>Capture</button>
    </div>
  );
};

export default Video;

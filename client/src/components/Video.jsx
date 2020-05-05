import React, { useEffect, useState, createRef } from "react";
import PropTypes from "prop-types";
import * as faceapi from "face-api.js";
require("dotenv").config();

const VideoComponent = () => {
  useEffect(() => {
    const temp = async () => {
      await loadModels();
    };
    temp();
  }, []);
  let vidRef = createRef();

  const loadModels = async () => {
    // const MODEL_URL = "/models";
    // await faceapi.loadFaceDetectionModel(MODEL_URL);
    // await faceapi.loadFaceLandmarkModel(MODEL_URL);
    // await faceapi.loadFaceRecognitionModel(MODEL_URL);
  };

  const streamCamVideo = () => {
    let constraints = { audio: false, video: {} };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(function (mediaStream) {
        let video = document.querySelector("video");
        video.srcObject = mediaStream;
        video.onloadedmetadata = function (e) {
          video.play();
        };
      })
      // .then(async () => {
      //   const detections = await faceapi.detectSingleFace(
      //     video,
      //     new faceapi.TinyFaceDetectorOptions()
      //   );
      // })
      .catch((err) => console.log(err.name + ": " + err.message));
  };

  return (
    <div>
      <div>
        <video autoPlay className="videoElement" ref={vidRef}></video>
      </div>
      <br />
      <button onClick={streamCamVideo}>Start Video</button>
    </div>
  );
};

VideoComponent.propTypes = {};

export default VideoComponent;

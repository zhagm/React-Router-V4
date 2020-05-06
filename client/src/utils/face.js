import * as faceapi from "face-api.js";

export async function loadModels() {
  const MODEL_URL = process.env.PUBLIC_URL + "/models";
  await faceapi.loadTinyFaceDetectorModel(MODEL_URL);
  await faceapi.loadFaceLandmarkTinyModel(MODEL_URL);
  await faceapi.loadFaceRecognitionModel(MODEL_URL);
}

export async function getFaceDetection(imgBlog, inputSize = 512) {
  const OPTION = new faceapi.TinyFaceDetectorOptions({
    inputSize,
    scoreThreshold: 0.5,
  });
  const useTinyModel = true;

  let img = await faceapi.fetchImage(imgBlog);

  let detection = await faceapi.detectSingleFace(img, OPTION);
  // .withFaceLandmarks(useTinyModel);
  return !!detection;
}

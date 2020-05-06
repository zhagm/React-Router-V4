import * as faceapi from "face-api.js";

export async function loadModels() {
  const MODEL_URL = process.env.PUBLIC_URL + "/models";
  // tinyface
  await faceapi.loadTinyFaceDetectorModel(MODEL_URL);
  await faceapi.loadFaceLandmarkTinyModel(MODEL_URL);

  // ssd (better but slower)
  await faceapi.loadSsdMobilenetv1Model(MODEL_URL);
  await faceapi.loadFaceLandmarkModel(MODEL_URL);
}

export async function getFaceDetection(imgBlog, inputSize = 512) {
  const OPTION = new faceapi.TinyFaceDetectorOptions({
    inputSize,
    scoreThreshold: 0.5,
  });
  const useTinyModel = false;

  let img = await faceapi.fetchImage(imgBlog);

  let detectionWithLandmarks = await faceapi
    // .detectSingleFace(img, OPTION)
    .detectSingleFace(img, new faceapi.SsdMobilenetv1Options())
    .withFaceLandmarks(useTinyModel);
  return detectionWithLandmarks;
}

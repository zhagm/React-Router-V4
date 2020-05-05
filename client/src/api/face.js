import * as faceapi from "face-api.js";

export async function loadModels() {
  const MODEL_URL = process.env.PUBLIC_URL + "/models";
  await faceapi.loadTinyFaceDetectorModel(MODEL_URL);
  await faceapi.loadFaceLandmarkTinyModel(MODEL_URL);
  await faceapi.loadFaceRecognitionModel(MODEL_URL);
}

export async function getFaceDetection(imgBlog, inputSize = 512) {
  // tiny_face_detector options
  const OPTION = new faceapi.TinyFaceDetectorOptions({
    inputSize,
    scoreThreshold: 0.5,
  });
  const useTinyModel = true;

  // fetch image to api
  let img = await faceapi.fetchImage(imgBlog);

  // detect all faces and generate full description from image
  // including landmark and descriptor of each face
  let detection = await faceapi
    .detectSingleFace(img, OPTION)
    .withFaceLandmarks(useTinyModel);
  console.log("DETECTION IS: ", detection);
  return detection;
}

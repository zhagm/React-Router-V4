import * as faceapi from "face-api.js";

// preload models before running faceapi detection
export async function loadModels() {
  const MODEL_URL = process.env.PUBLIC_URL + "/models";

  // ssd (better than tinyface but slower)
  await faceapi.loadSsdMobilenetv1Model(MODEL_URL);
  // for later :)
  // await faceapi.loadFaceLandmarkModel(MODEL_URL);
  // await faceapi.loadFaceExpressionModel(MODEL_URL);
}

// get face detection data
export async function getFaceDetection(imgBlob) {
  if (!imgBlob) return false;
  let img = await faceapi.fetchImage(imgBlob);

  let detection = await faceapi
    .detectSingleFace(img, new faceapi.SsdMobilenetv1Options())
    // .withFaceLandmarks()
    // .withFaceExpressions();
  return detection;
}

// returns a boolean true if a face was detected, false if not
export async function faceDetected(blob) {
  let detection = await getFaceDetection(blob);
  if (detection) return true;
  else return false;
}

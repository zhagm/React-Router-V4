import React from "react";
import PropTypes from "prop-types";

import CameraFaceDetector from "../components/webcam/CameraFaceDetector";

const UserProfile = ({ children, setCameraDetectsFace, user }) => {
  return (
    <div className="text-center m-3 mt-5">
      <h5 className="title">
        <div className="camera">
          <CameraFaceDetector onDetectionChange={setCameraDetectsFace} />
        </div>
        <span className="d-block mb-1">{user.name}</span>
        {children}
      </h5>
    </div>
  );
};

UserProfile.propTypes = {
  children: PropTypes.object,
  setCameraDetectsFace: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default UserProfile;

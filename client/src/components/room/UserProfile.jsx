import React from "react";
import PropTypes from "prop-types";
import { userProfileStyles as useStyles } from "../../utils/makeStylers";

import CameraFaceDetector from "../webcam/CameraFaceDetector";

/**
 * Returns user profile bar with camera for face detection.
 * @function UserProfile
 * @param {object} user - user object to display data of.
 * @param {object} children - nested children to render.
 * @param {func} setCameraDetectsFace - triggered on detection change.
 * @returns {div}
 */
const UserProfile = ({ children, setCameraDetectsFace, user }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <span>
        <h2 className={classes.center}>{user.name}</h2>
        <CameraFaceDetector onDetectionChange={setCameraDetectsFace} />
      </span>
      <span>{children}</span>
    </div>
  );
};

UserProfile.propTypes = {
  children: PropTypes.object,
  setCameraDetectsFace: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default UserProfile;

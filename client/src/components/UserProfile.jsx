import React from "react";
import { Badge, Button, Card, CardBody, Col } from "reactstrap";
import CameraFaceDetector from "../components/CameraFaceDetector";

const UserProfile = ({
  user,
  isOnline,
  isActive,
  setCameraDetectsFace,
  children,
}) => {
  const getStatuscolor = (active, online) => {
    const colors = {
      active: "success",
      online: "info",
      other: "secondary",
    };
    if (isActive) return colors["active"];
    if (isOnline) return colors["online"];
    return colors["other"];
  };
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

export default UserProfile;

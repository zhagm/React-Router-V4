import React from "react";
import PropTypes from "prop-types";
import { Button, CardHeader } from "reactstrap";
require("dotenv").config();
const ASSETS_URL = process.env.PUBLIC_URL + "/assets";

const SocialAuth = ({ authType }) => {
  return (
    <CardHeader className="bg-white pb-5">
      <div className="text-muted text-center mb-3">
        {authType === "login" && <small>Sign in with</small>}
        {authType === "register" && <small>Sign up with</small>}
      </div>
      <div className="btn-wrapper text-center">
        <Button
          className="btn-neutral btn-icon"
          color="default"
          onClick={(e) => alert("Error: social auth not yet implemented")}
        >
          <span className="btn-inner--icon mr-1">
            <img alt="" src={`${ASSETS_URL}/icons/github.svg`} />
          </span>
          <span className="btn-inner--text">Github</span>
        </Button>
        <Button
          className="btn-neutral btn-icon ml-1"
          color="default"
          onClick={(e) => alert("Error: social auth not yet implemented")}
        >
          <span className="btn-inner--icon mr-1">
            <img alt="" src={`${ASSETS_URL}/icons/google.svg`} />
          </span>
          <span className="btn-inner--text">Google</span>
        </Button>
      </div>
    </CardHeader>
  );
};

SocialAuth.propTypes = {
  authType: PropTypes.string.isRequired,
};

export default SocialAuth;

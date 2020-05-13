import React from "react";
import { Button, CardHeader } from "reactstrap";
require("dotenv").config();
const ASSETS_URL = process.env.PUBLIC_URL + "/assets";

const SocialLogin = () => {
  return (
    <CardHeader className="bg-white pb-5">
      <div className="text-muted text-center mb-3">
        <small>Sign in with</small>
      </div>
      <div className="btn-wrapper text-center">
        <Button
          className="btn-neutral btn-icon"
          color="default"
          href=""
          onClick={(e) => alert("Error: social login not yet implemented")}
        >
          <span className="btn-inner--icon mr-1">
            <img alt="..." src={`${ASSETS_URL}/icons/github.svg`} />
          </span>
          <span className="btn-inner--text">Github</span>
        </Button>
        <Button
          className="btn-neutral btn-icon ml-1"
          color="default"
          href=""
          onClick={(e) => alert("Error: social login not yet implemented")}
        >
          <span className="btn-inner--icon mr-1">
            <img alt="..." src={`${ASSETS_URL}/icons/google.svg`} />
          </span>
          <span className="btn-inner--text">Google</span>
        </Button>
      </div>
    </CardHeader>
  );
};

export default SocialLogin;

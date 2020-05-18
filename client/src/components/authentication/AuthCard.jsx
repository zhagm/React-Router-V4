import React from "react";
import { useLocation } from "react-router-dom";
import { Card, CardBody } from "reactstrap";

import AuthForm from "./AuthForm";
import SocialAuth from "./SocialAuth";

const AuthCard = () => {
  const authType = useLocation().pathname.slice(1);
  const formProps = {
    login: {
      authType: "login",
      errorId: "LOGIN_FAIL",
      rememberMe: true,
      buttonText: "Sign in",
      inputsArray: ["email", "password"],
    },
    register: {
      authType: "register",
      errorId: "REGISTER_FAIL",
      buttonText: "Sign up",
      inputsArray: ["name", "email", "password"],
    },
  };

  return (
    <Card className="bg-secondary shadow border-0">
      <SocialAuth authType={authType} />
      <CardBody className="px-lg-5 py-lg-3">
        <div className="text-center text-muted mb-4">
          {authType === "login" && <small>Or sign in with credentials</small>}
          {authType === "register" && (
            <small>Or sign up with credentials</small>
          )}
        </div>
        <AuthForm {...formProps[authType]} />
      </CardBody>
    </Card>
  );
};

export default AuthCard;

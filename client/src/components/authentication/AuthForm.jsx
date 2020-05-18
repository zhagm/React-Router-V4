import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Button, FormGroup, Form, Input, InputGroup, Alert } from "reactstrap";

import { login, register } from "../../actions/authActions";

const AuthForm = ({
  error,
  isAuthenticated,
  login,
  register,
  authType,
  errorId,
  inputsArray,
  rememberMe = false,
  buttonText = "Submit",
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const rememberMeRef = useRef();

  useEffect(() => {
    // if error message is relevant, update message to display Alert
    if (error && error.id === errorId) setErrorMessage(error.msg);
    else setErrorMessage(null);
  }, [error, errorId]);

  useEffect(() => {
    // to load saved users on form load
    if (rememberMe) {
      setName(localStorage.getItem("OP_name"));
      setEmail(localStorage.getItem("OP_email"));
      setPassword(localStorage.getItem("OP_password"));
    } else {
      setName("");
      setEmail("");
      setPassword("");
    }
  }, [rememberMe]);

  const inputChange = (e) => {
    const { name, value } = e.target;
    const setterMethod = {
      name: setName,
      email: setEmail,
      password: setPassword,
    };
    setterMethod[name](value);
  };

  const submit = (e) => {
    e.preventDefault();
    const sumbitMethod = authType === "login" ? login : register;
    sumbitMethod({ name, email, password });
    if (rememberMe && rememberMeRef.current && rememberMeRef.current.checked) {
      localStorage.setItem("OP_email", email);
      localStorage.setItem("OP_password", password);
    }
  };

  if (isAuthenticated) return <Redirect to="/dashboard" />;

  const inputTypeProps = {
    name: {
      name: "name",
      type: "text",
      placeholder: "Name",
      value: name,
    },
    email: {
      name: "email",
      type: "email",
      placeholder: "Email",
      value: email,
    },
    password: {
      name: "password",
      type: "password",
      placeholder: "Password",
      value: password,
    },
  };

  return (
    <Form role="form" onSubmit={submit}>
      {errorMessage && (
        <Alert color="danger" fade={false}>
          {errorMessage}
        </Alert>
      )}
      {inputsArray.map((inputType) => (
        <FormGroup>
          <InputGroup className="input-group-alternative">
            <Input onChange={inputChange} {...inputTypeProps[inputType]} />
          </InputGroup>
        </FormGroup>
      ))}
      {rememberMe && (
        <div className="custom-control custom-control-alternative custom-checkbox">
          <input
            className="custom-control-input"
            id="customCheckLogin"
            type="checkbox"
            ref={rememberMeRef}
          />
          <label className="custom-control-label" htmlFor="customCheckLogin">
            <span>Remember me</span>
          </label>
        </div>
      )}
      <div className="text-center">
        <Button className="my-4" color="primary" type="submit">
          {buttonText}
        </Button>
      </div>
    </Form>
  );
};

AuthForm.propTypes = {
  error: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  authType: PropTypes.string.isRequired,
  errorId: PropTypes.string.isRequired,
  inputsArray: PropTypes.arrayOf(PropTypes.string).isRequired,
  rememberMe: PropTypes.bool,
  buttonText: PropTypes.string,
};

const mapStateToProps = (state) => ({
  error: state.error,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login, register })(AuthForm);

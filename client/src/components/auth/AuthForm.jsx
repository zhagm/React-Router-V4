import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import { authFormStyles as useStyles } from "../../utils/makeStylers";
import Alert from "../general/Alert";
import { login, register } from "../../redux/actions/authActions";

/**
 * Returns login or register form.
 * @function AuthForm
 * @param {bool} isLogin - if not login, is  register.
 * @param {function} login - passed through redux connect.
 * @param {function} register - passed through redux connect.
 * @param {object} error - error object from redux state.
 * @returns {AuthForm}
 */
const AuthForm = ({ isAuthenticated, login, register, isLogin, error }) => {
  const classes = useStyles();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [inputErrors, setInputErrors] = useState({
    name: false,
    email: false,
    password: false,
  });
  const rememberMeRef = useRef();

  const formProps = {
    login: {
      authType: "login",
      errorId: "LOGIN_FAIL",
      rememberMe: true,
      buttonText: "Sign in",
      inputsArray: ["email", "password"],
      doValidate: false,
    },
    register: {
      authType: "register",
      errorId: "REGISTER_FAIL",
      rememberMe: false,
      buttonText: "Sign up",
      inputsArray: ["name", "email", "password"],
      doValidate: true,
    },
  };

  const {
    authType,
    errorId,
    rememberMe,
    buttonText,
    inputsArray,
    doValidate,
  } = formProps[isLogin ? "login" : "register"];

  const inputValidators = {
    name: () => {
      if (!doValidate) return;
      // check if name is at least 5 chars, update inputErrors with true or false
      if (name.length < 5) {
        setInputErrors({ ...inputErrors, name: true });
      } else {
        setInputErrors({ ...inputErrors, name: true });
      }
    },
    email: () => {
      if (!doValidate) return;
      // check if email is valid, update inputErrors with true or false
    },
    password: () => {
      if (!doValidate) return;
      // check if password is at least 5 chars, update inputErrors with true or false
    },
  };

  const inputTypeProps = {
    name: {
      name: "name",
      type: "text",
      label: "Name",
      value: name,
      key: "name",
      onBlur: inputValidators["name"],
      error: inputErrors["name"],
      helperText: inputErrors["name"] ? "Minimum 5 characters" : "",
    },
    email: {
      name: "email",
      type: "email",
      label: "Email",
      value: email,
      key: "email",
      onBlur: inputValidators["email"],
      // need to add error and helperText
    },
    password: {
      name: "password",
      type: "password",
      label: "Password",
      value: password,
      key: "password",
      onBlur: inputValidators["password"],
      // need to add error and helperText
    },
  };

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

  const onInputChange = (e) => {
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

  if (isAuthenticated) return <Redirect to="/rooms" />;

  return (
    <form
      onSubmit={submit}
      className={classes.root}
      id="authForm"
      noValidate
      autoComplete="off"
    >
      <span className={"label"}>{`${buttonText} with email`}</span>
      <Alert hide={!(error && error.id === errorId)} message={errorMessage} />
      {inputsArray.map((inputType) => (
        <TextField
          {...inputTypeProps[inputType]}
          onChange={onInputChange}
          variant="outlined"
        />
      ))}
      {rememberMe && (
        <FormControlLabel
          control={<Checkbox inputRef={rememberMeRef} />}
          label="Remember me"
        />
      )}
      <Button
        type="submit"
        variant="contained"
        color="secondary"
        disableElevation
      >
        {buttonText}
      </Button>
    </form>
  );
};

AuthForm.propTypes = {
  isLogin: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  error: PropTypes.object,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  error: state.error,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login, register })(AuthForm);

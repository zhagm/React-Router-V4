import React, { useState, useRef, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../actions/authActions";
import {
  Button,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Alert,
} from "reactstrap";

const LoginForm = ({ login, error, isAuthenticated }) => {
  let [email, setEmail] = useState(localStorage.getItem("OP_email"));
  let [password, setPassword] = useState(localStorage.getItem("OP_password"));
  let [errorMessage, setErrorMessage] = useState("");
  let rememberMe = useRef();

  useEffect(() => {
    if (error && error.id === "LOGIN_FAIL") setErrorMessage(error.msg);
    else setErrorMessage(null);
  }, [error]);

  const inputChange = (e) => {
    const { name, value } = e.target;
    const setterMethod = {
      email: setEmail,
      password: setPassword,
    };
    setterMethod[name](value);
  };

  const submit = (e) => {
    e.preventDefault();
    login({ email, password });
    if (rememberMe.current.checked) {
      localStorage.setItem("OP_email", email);
      localStorage.setItem("OP_password", password);
    }
  };

  if (isAuthenticated) return <Redirect to="/dashboard" />;

  return (
    <Form role="form" onSubmit={submit}>
      {errorMessage && (
        <Alert color="danger" fade={false}>
          {errorMessage}
        </Alert>
      )}
      <FormGroup className="mb-3">
        <InputGroup className="input-group-alternative">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="ni ni-email-83" />
            </InputGroupText>
          </InputGroupAddon>
          <Input
            placeholder="Email"
            type="email"
            name="email"
            value={email}
            onChange={inputChange}
          />
        </InputGroup>
      </FormGroup>
      <FormGroup>
        <InputGroup className="input-group-alternative">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="ni ni-lock-circle-open" />
            </InputGroupText>
          </InputGroupAddon>
          <Input
            placeholder="Password"
            type="password"
            name="password"
            autoComplete="off"
            value={password}
            onChange={inputChange}
          />
        </InputGroup>
      </FormGroup>
      <div className="custom-control custom-control-alternative custom-checkbox">
        <input
          className="custom-control-input"
          id="customCheckLogin"
          type="checkbox"
          ref={rememberMe}
        />
        <label className="custom-control-label" htmlFor="customCheckLogin">
          <span>Remember me</span>
        </label>
      </div>
      <div className="text-center">
        <Button className="my-4" color="primary" type="submit">
          Sign in
        </Button>
      </div>
    </Form>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { login })(LoginForm);

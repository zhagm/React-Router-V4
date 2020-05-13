import React, { useState, useRef, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { register } from "../../actions/authActions";
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

const RegisterForm = ({ register, error, isAuthenticated }) => {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (error && error.id === "REGISTER_FAIL") setErrorMessage(error.msg);
    else setErrorMessage(null);
  }, [error]);

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
    register({ name, email, password });
  };

  if (isAuthenticated) return <Redirect to="/rooms" />;

  return (
    <Form role="form" onSubmit={submit}>
      {errorMessage && (
        <Alert color="danger" fade={false}>
          {errorMessage}
        </Alert>
      )}
      <FormGroup>
        <InputGroup className="input-group-alternative mb-3">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="ni ni-hat-3" />
            </InputGroupText>
          </InputGroupAddon>
          <Input
            placeholder="Name"
            type="text"
            name="name"
            value={name}
            onChange={inputChange}
          />
        </InputGroup>
      </FormGroup>
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

export default connect(mapStateToProps, { register })(RegisterForm);

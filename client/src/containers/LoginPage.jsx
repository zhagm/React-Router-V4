import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../actions/authActions";
import { clearErrors } from "../actions/errorActions";
import { Redirect, Link } from "react-router-dom";
import Alert from "../components/Alert";

class LoginPage extends Component {
  state = {
    email: "",
    password: "",
    msg: "",
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };

  componentDidUpdate = (prevProps) => {
    const { error } = this.props;
    if (error !== prevProps.error) {
      if (error.id === "LOGIN_FAIL") this.setState({ msg: error.msg });
      else this.setState({ msg: null });
    }
  };

  inputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    this.props.login({ email, password });
  };

  render() {
    if (this.props.isAuthenticated) return <Redirect to="/" />;
    return (
      <div>
        <h1>Login</h1>
        <Alert message={this.state.msg} />
        <div>
          <form onSubmit={this.submit}>
            {["email", "password"].map((val, i) => {
              return (
                <label key={i}>
                  {val.toUpperCase()}:
                  <input
                    type={val}
                    name={val}
                    value={this.state[val]}
                    onChange={this.inputChange}
                  />
                  <br />
                </label>
              );
            })}
            <input type="submit" value="Submit" />
          </form>
          <div>
            Don't have an account? <Link to="/register">Get started here.</Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { login, clearErrors })(LoginPage);

import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";

const LoginPage = ({ isAuthenticated }) => {
  if (isAuthenticated) return <Redirect to="/" />;
  return (
    <div>
      <h1>Login</h1>
      <div>
        <form>
          <label>
            Name:
            <input type="text" name="name" />
          </label>
          <input type="submit" value="Submit" />
        </form>
        Don't have an account? <Link to="/register">Get started here.</Link>
      </div>
    </div>
  );
};

LoginPage.propTypes = {};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, {})(LoginPage);

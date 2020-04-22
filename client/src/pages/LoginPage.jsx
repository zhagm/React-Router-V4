import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div>
      <h1>Login</h1>
      <div>
        Don't have an account? <Link to="/register">Get started here.</Link>
      </div>
    </div>
  );
};

LoginPage.propTypes = {};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(LoginPage);

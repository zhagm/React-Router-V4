import React from "react";
import PropTypes from "prop-types";

const Alert = ({ message }) => {
  if (message) return <div className="alert">{message}</div>;
  else return null;
};

Alert.propTypes = {
  message: PropTypes.string,
};

export default Alert;

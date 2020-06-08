import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { logout } from "../../actions/authActions";

const Logout = ({ logout }) => {
    useEffect(() => logout(), [logout]);

    return (<Redirect to="/" />);
};

Logout.propTypes = {
    logout: PropTypes.func.isRequired,
};

export default connect(null, { logout })(Logout);
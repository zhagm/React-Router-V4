import React from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../actions/authActions";
import "../styles/Nav.css";

const Nav = ({ isAuthenticated, logout }) => {
  const history = useHistory();
  return (
    <nav id="mainNav">
      <div className="logo">
        <h4 to="/">OfficePlace</h4>
      </div>
      <ul className="navGroup">
        <li>
          <Link to="/rooms">ROOMS</Link>
        </li>
        <li>
          {isAuthenticated ? (
            <Link to="/">
              <button onClick={() => logout() && history.push("/")}>
                LOGOUT
              </button>
            </Link>
          ) : (
            <Link to="/login">
              <button>LOGIN</button>
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

Nav.propTypes = {
  isAuthenticated: PropTypes.bool,
  logout: PropTypes.func.isRequired,
};

export default connect(null, { logout })(Nav);

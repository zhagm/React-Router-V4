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
      <ul className="navGroup navBrand">
        <li>
          <Link to="/">OfficePlace</Link>
        </li>
      </ul>
      <ul className="navGroup">
        <li>
          <Link to="/users">USERS</Link>
        </li>
        <li>
          <Link to="/items">ITEMS</Link>
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

// const mapStateToProps = (state) => ({
//   isAuthenticated: state.auth.isAuthenticated,
// });

Nav.propTypes = {
  isAuthenticated: PropTypes.bool,
  logout: PropTypes.func.isRequired,
};

export default connect(null, { logout })(Nav);

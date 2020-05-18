import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, useHistory, useLocation } from "react-router-dom";
import { connect } from "react-redux";

import { logout } from "../../actions/authActions";
import classnames from "../../utils/classnames";
import CollapseNav from "./CollapseNav";

import {
  Button,
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  Nav,
  Container,
} from "reactstrap";

const NavBar = ({
  isAuthenticated,
  links = [
    { url: "/dashboard", name: "Dashboard", private: true },
    { url: "/about", name: "About Us", private: false },
  ],
  logout,
}) => {
  const history = useHistory();
  const location = useLocation();

  return (
    <header className="header-global">
      <Navbar className="navbar-main navbar-transparent navbar-light headroom">
        <Container>
          <NavbarBrand className="mr-lg-5" to="/" tag={Link}>
            OFFICEPLACE
          </NavbarBrand>
          <CollapseNav isAuthenticated={isAuthenticated} items={links} />
        </Container>
      </Navbar>
    </header>
  );
};

NavBar.propTypes = {
  isAuthenticated: PropTypes.bool,
  links: PropTypes.array,
  logout: PropTypes.func,
};

export default connect(null, { logout })(NavBar);

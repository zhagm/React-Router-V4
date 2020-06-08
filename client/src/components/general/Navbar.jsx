import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import CollapseNav from "./CollapseNav";

import {
  NavbarBrand,
  Navbar,
  Container,
} from "reactstrap";

const NavBar = ({
  isAuthenticated,
  links = [
    { url: "/dashboard", name: "Dashboard", private: true },
    { url: "/about", name: "About Us", private: false },
  ],
}) => {

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
};

export default NavBar;

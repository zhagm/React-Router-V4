import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../actions/authActions";

import {
  Button,
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";

const NavBar = ({
  isAuthenticated,
  logout,
  links = [{ url: "/rooms", name: "Rooms" }],
}) => {
  let [collapseClasses, setCollapseClasses] = useState("");
  const history = useHistory();

  const onExiting = () => {
    setCollapseClasses("collapsing-out");
  };

  const onExited = () => {
    setCollapseClasses("");
  };

  return (
    <header className="header-global">
      <Navbar
        className="navbar-main navbar-transparent navbar-light headroom"
        expand="lg"
        id="navbar-main"
      >
        <Container>
          <NavbarBrand className="mr-lg-5" to="/" tag={Link}>
            OFFICEPLACE
          </NavbarBrand>
          <button className="navbar-toggler" id="navbar_global">
            <span className="navbar-toggler-icon" />
          </button>
          <UncontrolledCollapse
            toggler="#navbar_global"
            navbar
            className={collapseClasses}
            onExiting={onExiting}
            onExited={onExited}
          >
            <div className="navbar-collapse-header">
              <Row>
                <Col className="collapse-brand" xs="6">
                  <Link to="/">OFFICEPLACE</Link>
                </Col>
                <Col className="collapse-close" xs="6">
                  <button className="navbar-toggler" id="navbar_global">
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>
            <Nav className="align-items-lg-center ml-lg-auto" navbar>
              {links.map((link) => (
                <NavItem>
                  <Link to={link.url}>
                    <NavLink to={link.url}>{link.name}</NavLink>
                  </Link>
                </NavItem>
              ))}
              <NavItem className="d-none d-lg-block ml-lg-4">
                <Link to={isAuthenticated ? "/" : "/login"}>
                  <Button
                    onClick={() =>
                      isAuthenticated && logout() && history.push("/")
                    }
                    className="btn-neutral btn-icon"
                    color="default"
                  >
                    <span className="nav-link-inner--text ml-1">
                      {isAuthenticated ? "Logout" : "Get Started"}
                    </span>
                  </Button>
                </Link>
              </NavItem>
            </Nav>
          </UncontrolledCollapse>
        </Container>
      </Navbar>
    </header>
  );
};

Nav.propTypes = {
  isAuthenticated: PropTypes.bool,
  logout: PropTypes.func.isRequired,
};

export default connect(null, { logout })(NavBar);

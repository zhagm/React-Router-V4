import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, useHistory, useLocation } from "react-router-dom";
import { connect } from "react-redux";

import { logout } from "../../actions/authActions";
import classnames from "../../utils/classnames";

import {
  Button,
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";

const NavBar = ({
  isAuthenticated,
  links = [
    { url: "/dashboard", name: "Dashboard", private: true },
    { url: "/about", name: "About Us", private: false },
  ],
  logout,
}) => {
  let [collapseClasses, setCollapseClasses] = useState("");
  const history = useHistory();
  const location = useLocation();

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
            onExiting={() => setCollapseClasses("collapsing-out")}
            onExited={() => setCollapseClasses("")}
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
              {links
                .filter((l) => l.private === isAuthenticated)
                .map((link) => {
                  return (
                    <NavItem key={link.name}>
                      <Link
                        className={classnames("NavLink", {
                          active:
                            location.pathname.toLowerCase() ===
                            link.url.toLowerCase(),
                        })}
                        to={link.url}
                      >
                        {link.name}
                      </Link>
                    </NavItem>
                  );
                })}
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
                      {isAuthenticated ? "Logout" : "Login"}
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

NavBar.propTypes = {
  isAuthenticated: PropTypes.bool,
  links: PropTypes.array,
  logout: PropTypes.func,
};

export default connect(null, { logout })(NavBar);

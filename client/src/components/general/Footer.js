import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { NavItem, Nav, Container, Row, Col } from "reactstrap";

const Footer = ({ links = [] }) => {
  return (
    <footer className="footer">
      <Container>
        <Row className=" align-items-center justify-content-md-between">
          <Col md="6">
            <div className=" copyright">
              © {new Date().getFullYear()} OfficePlace
            </div>
          </Col>
          <Col md="6">
            <Nav className=" nav-footer justify-content-end">
              {links.map((link) => (
                <NavItem>
                  <Link className="NavLink" to={link.url}>
                    {link.name}
                  </Link>
                </NavItem>
              ))}
            </Nav>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

Footer.propTypes = {
  links: PropTypes.array,
};

export default Footer;

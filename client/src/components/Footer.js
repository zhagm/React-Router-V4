import React from "react";
import { Link } from "react-router-dom";
import { NavItem, NavLink, Nav, Container, Row, Col } from "reactstrap";

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
                  <Link to={link.url}>
                    <NavLink to={link.url}>{link.name}</NavLink>
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

export default Footer;

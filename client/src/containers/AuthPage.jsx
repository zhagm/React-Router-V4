import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";

import AuthCard from "../components/authentication/AuthCard";

const AuthPage = () => {
  const authType = useLocation().pathname.slice(1);
  return (
    <main className="main">
      <section className="section section-shaped section-lg">
        <div className="shape shape-style-1 bg-gradient-default">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <Container className="pt-lg-4">
          <Row className="justify-content-center">
            <Col lg="5">
              <AuthCard />
              <Row className="mt-3">
                <Col xs="6">
                  <Link
                    className="text-light"
                    to="/login"
                    onClick={() =>
                      alert("Error: password reset not yet implemented")
                    }
                  >
                    <small>Forgot password?</small>
                  </Link>
                </Col>
                <Col className="text-right" xs="6">
                  <Link
                    className="text-light"
                    to={`/${authType === "login" ? "register" : "login"}`}
                  >
                    <small>
                      {authType === "login"
                        ? "Create new account"
                        : "I already have an account"}
                    </small>
                  </Link>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};

export default AuthPage;

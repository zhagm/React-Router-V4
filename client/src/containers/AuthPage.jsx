import React from "react";
import LoginForm from "../components/authentication/LoginForm";
import RegisterForm from "../components/authentication/RegisterForm";
import SocialAuth from "../components/authentication/SocialAuth";
import { Link, useLocation } from "react-router-dom";
import { Card, CardBody, Container, Row, Col } from "reactstrap";

const AuthPage = () => {
  const authType = useLocation().pathname.slice(1);
  const Form = authType === "login" ? <LoginForm /> : <RegisterForm />;
  return (
    <main classname="main">
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
              <Card className="bg-secondary shadow border-0">
                <SocialAuth authType={authType} />
                <CardBody className="px-lg-5 py-lg-3">
                  <div className="text-center text-muted mb-4">
                    {authType === "login" && (
                      <small>Or sign in with credentials</small>
                    )}
                    {authType === "register" && (
                      <small>Or sign up with credentials</small>
                    )}
                  </div>
                  {Form}
                </CardBody>
              </Card>
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

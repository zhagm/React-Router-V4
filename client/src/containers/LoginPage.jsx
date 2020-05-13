import React from "react";
import LoginForm from "../components/LoginInputs";
import SocialLogin from "../components/SocialLogin";
import { Link } from "react-router-dom";
import { Card, CardBody, Container, Row, Col } from "reactstrap";

const Login = () => {
  return (
    <main>
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
        <Container className="pt-lg-7">
          <Row className="justify-content-center">
            <Col lg="5">
              <Card className="bg-secondary shadow border-0">
                <SocialLogin />
                <CardBody className="px-lg-5 py-lg-3">
                  <div className="text-center text-muted mb-4">
                    <small>Or sign in with credentials</small>
                  </div>
                  <LoginForm />
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
                  <Link className="text-light" to="/register">
                    <small>Create new account</small>
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

export default Login;

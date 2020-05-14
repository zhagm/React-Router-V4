import React, { useState } from "react";
import { Link } from "react-router-dom";
import classnames from "../utils/classnames";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardImg,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";

const SplashPage = () => {
  return (
    <main className="main">
      <div className="position-relative">
        {/* <section className="section section-lg section-shaped pb-250">
          <div className="shape shape-style-1 shape-default"> */}
        <section className="section section-shaped section-lg pb-250">
          <div className="shape shape-style-1 bg-gradient-default">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <Container className="py-lg-md d-flex pt-5">
            <div className="col px-0">
              <Row>
                <Col lg="6">
                  <h1 className="display-3 text-white">
                    OfficePlace
                    {/* <span>subtext here</span> */}
                  </h1>
                  <p className="lead text-white">
                    A virtual office space for your team, closing the distance
                    between remote coworkers so that even when you’re working on
                    your own, you’re working together
                  </p>
                  <div className="btn-wrapper">
                    <Link to="/login">
                      <Button className="btn-icon mb-3 mb-sm-0" color="info">
                        <span className="btn-inner--text">Get Started</span>
                      </Button>
                    </Link>
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
          <div className="separator separator-bottom separator-skew">
            <svg
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon className="fill-white" points="2560 0 2560 100 0 100" />
            </svg>
          </div>
        </section>
      </div>
    </main>
  );
};

export default SplashPage;

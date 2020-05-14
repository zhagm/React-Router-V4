import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getRooms } from "../actions/roomActions";
import RoomCard from "../components/RoomCard";
import { Container, Row, Col } from "reactstrap";
import NewRoomModal from "../components/NewRoomModal";
import NewRoomForm from "../components/NewRoomForm";
require("dotenv").config();

const RoomsPage = ({ rooms = [], getRooms }) => {
  useEffect(() => {
    getRooms();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className="navBackground bg-default"></div>
      <section className="section section-lg pt-lg-0">
        <Container>
          <Row>
            <Col lg="12 mt-5 mb-3">
              <NewRoomModal
                buttonText={"Make A New Room"}
                title={"Make A New Room"}
              />
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col lg="12 py-3">
              <Row className="row-grid">
                {rooms.map((room) => (
                  <RoomCard key={room._id} room={room} />
                ))}
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

RoomsPage.propTypes = {
  getRooms: PropTypes.func.isRequired,
  rooms: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  rooms: state.rooms.rooms,
});

export default connect(mapStateToProps, { getRooms })(RoomsPage);

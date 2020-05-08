import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getRooms } from "../actions/roomActions";
import { Link } from "react-router-dom";

const RoomsPage = ({ rooms, getRooms }) => {
  useEffect(() => {
    getRooms();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h1>YOUR ROOMS</h1>
      <Link to={`rooms/new`}>
        <button>Make a room</button>
      </Link>
      <ul>
        {(rooms || []).map((room) => (
          <li key={room._id}>
            {room.name} ({room.members.length} member
            {room.members.length !== 1 && "s"})
            <Link to={`rooms/${room._id}`}>
              <button>ENTER</button>
            </Link>
          </li>
        ))}
      </ul>
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

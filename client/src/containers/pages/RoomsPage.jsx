import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";

import { getRooms } from "../../redux/actions/roomActions";

import { roomsPageStyles as useStyles } from "../../utils/makeStylers";
import RoomCard from "../../components/room/RoomCard";

import Grid from "../../components/general/Grid";
import Modal from "../../components/general/Modal";

/**
 * Returns rooms page which lists all rooms, container that connects to redux store.
 * @function RoomsPage
 * @param {func} getRooms - action passed from redux connect to get rooms from server.
 * @param {array} rooms - passed from redux connect, array of room objects.
 * @param {object} socket - passed from redux connect, socket connection.
 * @returns {div}
 */
function RoomsPage({ getRooms, rooms = [], socket }) {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [onlineCounts, setOnlineCounts] = useState({});

  useEffect(() => {
    getRooms();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (rooms.length) {
      socket.emit(
        "client:getOnlineCounts",
        rooms.map((room) => room._id)
      );
      socket.on("server:getOnlineCounts", (onlineCountsObj) => {
        setOnlineCounts(onlineCountsObj);
      });
    }
  }, [rooms]);

  let RoomItems = rooms.map((room) => {
    let onlineCount = onlineCounts[room._id] || 0;
    return <RoomCard onlineCount={onlineCount} key={room._id} room={room} />;
  });

  return (
    <div className={classes.root}>
      <h1>Rooms</h1>
      <Button
        onClick={() => setIsOpen(true)}
        variant="contained"
        color="secondary"
      >
        Make A New Room
      </Button>
      <Modal open={isOpen} handleClose={() => setIsOpen(false)}>
        <p>modal element goes here</p>
      </Modal>
      <Grid items={RoomItems} />
    </div>
  );
}

RoomsPage.propTypes = {
  getRooms: PropTypes.func.isRequired,
  rooms: PropTypes.array,
};

const mapStateToProps = (state) => ({
  rooms: state.rooms.rooms,
  socket: state.socket.socket,
});

export default connect(mapStateToProps, { getRooms })(RoomsPage);

import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getRooms } from "../../redux/actions/roomActions";

import { roomsPageStyles as useStyles } from "../../utils/makeStylers";
import RoomCard from "../../components/room/RoomCard";

import Grid from "../../components/general/Grid";

/**
 * Returns rooms page which lists all rooms, container that connects to redux store.
 * @function RoomsPage
 * @param {func} getRooms - action passed from redux connect to get rooms from server.
 * @param {array} rooms - passed from redux connect, array of room objects.
 * @returns {div}
 */
function RoomsPage({ getRooms, rooms = [] }) {
  const classes = useStyles();

  useEffect(() => {
    getRooms();
    // eslint-disable-next-line
  }, []);

  let RoomItems = rooms.map((room) => <RoomCard key={room._id} room={room} />);

  return (
    <div className={classes.root}>
      <h1>Rooms</h1>
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
});

export default connect(mapStateToProps, { getRooms })(RoomsPage);

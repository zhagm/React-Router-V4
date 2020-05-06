import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getRoomMembers, getRoom } from "../actions/roomActions.js";
import { getOnlineUsers } from "../actions/socketActions.js";
import { useParams } from "react-router-dom";
import ChatPage from "./ChatPage";

const RoomPage = ({
  getRoomMembers,
  getOnlineUsers,
  onlineUsers = [],
  isLoading,
  user,
  members = [],
  room,
  getRoom,
}) => {
  const { id: roomId } = useParams();

  useEffect(() => {
    getRoomMembers(roomId);
    getOnlineUsers();
    getRoom(roomId);
    // eslint-disable-next-line
  }, []);

  const isActive = (userId) => {
    return onlineUsers && onlineUsers.find((u) => u === userId);
  };

  if (isLoading || !user || !room)
    return <div>You need to log in to start chatting!</div>;

  return (
    <div>
      <h1>ROOM: {room.name}</h1>
      {members.map((u) => (
        <div
          key={u._id}
          className={`userSelect ${isActive(u._id) ? "activeUser" : ""}`}
        >
          {u.name}
        </div>
      ))}
      <ChatPage />
    </div>
  );
};

RoomPage.propTypes = {
  getRoomMembers: PropTypes.func,
  getOnlineUsers: PropTypes.func,
  user: PropTypes.object,
  isLoading: PropTypes.bool,
  members: PropTypes.array,
  getRoom: PropTypes.func,
  room: PropTypes.object,
};

const mapStateToProps = (state) => ({
  room: state.rooms.currentRoom,
  members: state.rooms.currentRoomMembers,
  user: state.auth.user,
  isLoading: state.auth.isLoading,
  onlineUsers: state.socket.onlineUsers,
});

export default connect(mapStateToProps, {
  getRoomMembers,
  getOnlineUsers,
  getRoom,
})(RoomPage);

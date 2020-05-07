import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getRoomMembers, getRoom } from "../actions/roomActions.js";
// import { getOnlineUsers, getOnlineMembers } from "../actions/socketActions.js";
import { useParams } from "react-router-dom";
// import ChatPage from "./ChatPage";
import VideoPage from "../components/VideoPage";
import { loadUser } from "../actions/authActions.js";

const RoomPage = ({
  getRoomMembers,
  // getOnlineUsers,
  // onlineUsers = [],
  isLoading,
  user,
  members = [],
  room,
  getRoom,
  socket,
}) => {
  const { id: roomId } = useParams();
  const [onlineMembers, setOnlineMembers] = useState([]);

  useEffect(() => {
    getRoomMembers(roomId);
    // getOnlineMembers();
    getRoom(roomId);
    loadUser();
    return () => {
      console.log("cleanup!");
      if (socket) {
        socket.emit("client:leaveRoom", roomId);
        console.log("cleanup!");
      }
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (socket && user) {
      // once socket is connected and user is authenticated and loaded
      socket.emit("client:login", user);
      socket.emit("client:getOnlineMembers", roomId);
      socket.emit("client:enterRoom", roomId);
      socket.on("console.log", (m) => console.log("Server: ", m));
      socket.on("server:enterRoom", (userId) => {
        socket.emit("client:getOnlineMembers", roomId);
      });
      socket.on("server:getOnlineMembers", (members) =>
        setOnlineMembers(members)
      );
      socket.on("server:userSentMessage", (message) => {
        console.log({ message });
      });
      socket.on("server:leaveRoom", (userId) => {
        socket.emit("client:getOnlineMembers", roomId);
      });
    }
  }, [socket, user]);

  const isActive = (userId) => {
    return onlineMembers && onlineMembers.find((u) => u === userId);
  };

  if (isLoading || !user || !room || !socket) return <div>Loading</div>;

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
      <VideoPage />
      {/* <ChatPage /> */}
    </div>
  );
};

RoomPage.propTypes = {
  getRoomMembers: PropTypes.func,
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
  socket: state.socket.socket,
});

export default connect(mapStateToProps, {
  getRoomMembers,
  // getOnlineUsers,
  getRoom,
})(RoomPage);

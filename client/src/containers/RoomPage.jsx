import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getRoomMembers,
  enterRoom,
  leaveRoom,
} from "../actions/roomActions.js";
import { useParams } from "react-router-dom";
import CameraFaceDetector from "../components/CameraFaceDetector";
import ChatPage from "../containers/ChatPage";
import { loadUser } from "../actions/authActions.js";

const RoomPage = ({
  getRoomMembers,
  isLoading,
  user,
  members = [],
  room,
  enterRoom,
  leaveRoom,
  socket,
}) => {
  const { id: roomId } = useParams();
  const [onlineMembers, setOnlineMembers] = useState([]);
  const [activeMembers, setActiveMembers] = useState([]);
  const [cameraDetectsFace, setCameraDetectsFace] = useState(null);
  let init = true;

  useEffect(() => {
    getRoomMembers(roomId);
    enterRoom(roomId);
    loadUser();
    return () => {
      console.log("cleanup!");
      if (socket) {
        socket.emit("client:leaveRoom", roomId);
        console.log("cleanup!");
      }
      leaveRoom();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (socket && user && init) {
      // once socket is connected and user is authenticated and loaded
      socket.emit("client:login", user);
      socket.emit("client:getOnlineMembers", roomId);
      socket.emit("client:getActiveMembers", roomId);
      socket.emit("client:enterRoom", roomId);

      socket.on("console.log", (m) => console.log("Server: ", m));
      socket.on("server:enterRoom", (userId) => {
        socket.emit("client:getOnlineMembers", roomId);
      });
      socket.on("server:getOnlineMembers", (members) => {
        setOnlineMembers(members);
      });
      socket.on("server:getActiveMembers", (members) => {
        setActiveMembers(members);
      });
      socket.on("server:leaveRoom", (userId) => {
        socket.emit("client:getOnlineMembers", roomId);
        socket.emit("client:getActiveMembers", roomId);
      });
      init = false;
    }
  }, [socket, user]);

  useEffect(() => {
    if (cameraDetectsFace && socket)
      socket.emit("client:addActiveMember", roomId);
    if (!cameraDetectsFace && socket)
      socket.emit("client:deleteActiveMember", roomId);
  }, [cameraDetectsFace]);

  const isOnline = (userId) => {
    return onlineMembers && onlineMembers.find((u) => u === userId);
  };

  const isActive = (userId) => {
    return activeMembers && activeMembers.find((u) => u === userId);
  };

  if (isLoading || !user || !room || !socket) return <div>Loading</div>;

  return (
    <div>
      <h1>ROOM: {room.name}</h1>
      {members.map((u) => (
        <div
          key={u._id}
          className={`desk ${
            isActive(u._id) ? "activeUser" : isOnline(u._id) ? "onlineUser" : ""
          }`}
        >
          {u.name}
        </div>
      ))}
      <CameraFaceDetector onDetectionChange={setCameraDetectsFace} />
      <ChatPage
        activeMembers={activeMembers}
        onlineMembers={onlineMembers}
        allMembers={members}
        currentRoom={room}
      />
    </div>
  );
};

RoomPage.propTypes = {
  getRoomMembers: PropTypes.func,
  user: PropTypes.object,
  isLoading: PropTypes.bool,
  members: PropTypes.array,
  enterRoom: PropTypes.func,
  leaveRoom: PropTypes.func,
  room: PropTypes.object,
};

const mapStateToProps = (state) => ({
  room: state.rooms.currentRoom,
  members: state.rooms.currentRoomMembers,
  user: state.auth.user,
  isLoading: state.auth.isLoading,
  socket: state.socket.socket,
});

export default connect(mapStateToProps, {
  getRoomMembers,
  enterRoom,
  leaveRoom,
})(RoomPage);

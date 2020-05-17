import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { Row, Col } from "reactstrap";

import UserProfile from "../components/UserProfile";
import UserCard from "../components/UserCard";
import ChatPage from "../containers/ChatPage";
import { loadUser } from "../actions/authActions.js";
import {
  getRoomMembers,
  enterRoom,
  leaveRoom,
} from "../actions/roomActions.js";

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
      // cleanup
      if (socket) {
        socket.emit("client:leaveRoom", roomId);
        console.log("cleanup!");
        socket.off("console.log");
        socket.off("server:enterRoom");
        socket.off("server:getOnlineMembers");
        socket.off("server:getActiveMembers");
        socket.off("server:leaveRoom");
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

      socket.on("console.log", (...m) => console.log("Server: ", ...m));
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
  }, [socket, user, init]);

  useEffect(() => {
    if (cameraDetectsFace && socket)
      socket.emit("client:addActiveMember", roomId);
    if (!cameraDetectsFace && socket)
      socket.emit("client:deleteActiveMember", roomId);
  }, [cameraDetectsFace]);

  const isOnline = (userId) => onlineMembers.find((u) => u === userId);

  const isActive = (userId) => activeMembers.find((u) => u === userId);

  if (isLoading || !user || !room || !socket)
    return (
      <div>
        <div className="navBackground bg-default"></div>
        Loading
      </div>
    );

  return (
    <div>
      <div className="navBackground bg-default"></div>
      <Row>
        <Col lg="3">
          {/* User profile left column */}
          <UserProfile
            key={user._id}
            user={user}
            isActive={isActive(user._id)}
            isOnline={isOnline(user._id)}
            setCameraDetectsFace={setCameraDetectsFace}
          >
            <ChatPage
              activeMembers={activeMembers}
              onlineMembers={onlineMembers}
              allMembers={members}
              currentRoom={room}
            />
          </UserProfile>
        </Col>
        <Col lg="9" className="desks-col">
          <div className="mt-5">
            <h2>{room.name}</h2>
            <p>{room.description}</p>
          </div>
          {/* Rows of 'desks' */}
          <Row className="row-grid">
            {members.map((user) => (
              <UserCard
                key={user._id}
                user={user}
                isActive={isActive(user._id)}
                isOnline={isOnline(user._id)}
                setCameraDetectsFace={setCameraDetectsFace}
              />
            ))}
          </Row>
        </Col>
      </Row>
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

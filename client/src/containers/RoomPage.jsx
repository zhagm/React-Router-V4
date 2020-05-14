import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getRoomMembers,
  enterRoom,
  leaveRoom,
} from "../actions/roomActions.js";
import { useParams } from "react-router-dom";
import ChatPage from "../containers/ChatPage";
import { loadUser } from "../actions/authActions.js";
import classnames from "../utils/classnames";
import UserCard from "../components/UserCard";
import UserProfile from "../components/UserProfile";
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
const ASSETS_URL = process.env.PUBLIC_URL + "/assets";

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
  }, [socket, user, init]);

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
        <Col lg="9">
          <div className="mt-5">
            <h2>{room.name}</h2>
            <p>{room.description}</p>
          </div>
          <Row className="justify-content-center">
            <Col lg="9 py-3">
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
        </Col>
      </Row>
      {/* <Row>
        <Col className="m-5" md="9">
          <div className="">
            <h2>{room.name}</h2>
            <p>{room.description}</p>
            {members.map((u) => (
              <div className="d-flex align-items-center">
                <div className="px-4"> */}
      {/* <img
                  src={`https://i.picsum.photos/id/${Math.floor(
                    Math.random() * (100 - 1) + 1
                  )}/200/200.jpg`}
                  className="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                  // src={`${ASSETS_URL}/img/theme/team-2-800x800.jpg`}
                  style={{ width: "200px" }}
                />
                  <div className="pt-4 text-center">
                    <h5 className="title">
                      <span className="d-block mb-1">{u.name}</span>
                      <small className="h6 text-muted">
                        Marketing Strategist
                      </small>
                    </h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Col>
      </Row> */}
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

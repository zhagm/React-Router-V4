import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { roomPageStyles as useStyles } from "../../utils/makeStylers";
import {
  getRoomMembers,
  enterRoom,
  leaveRoom,
} from "../../redux/actions/roomActions";
import DeskCard from "../../components/room/DeskCard";
import UserProfile from "../../components/room/UserProfile";
import ChatPage from "../../containers/pages/ChatPage";
import Grid from "../../components/general/Grid";

/**
 * Returns room page with desks grid and camera comp, connects to redux store.
 * @function RoomPage
 * @param {func} getRooms - action passed from redux connect to get rooms from server.
 * @param {array} rooms - passed from redux connect, array of room objects.
 * @returns {div}
 */
function RoomPage({
  getRoomMembers,
  isLoading,
  user,
  members = [],
  room,
  enterRoom,
  leaveRoom,
  socket,
}) {
  const classes = useStyles();

  const { id: roomId } = useParams();
  const [onlineMembers, setOnlineMembers] = useState([]);
  const [activeMembers, setActiveMembers] = useState([]);
  const [cameraDetectsFace, setCameraDetectsFace] = useState(null);

  useEffect(() => {
    getRoomMembers(roomId);
    enterRoom(roomId);
    return () => {
      // cleanup
      if (socket) {
        socket.emit("client:leaveRoom", roomId);
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
    // socket emits and listeners
    if (socket && user && roomId) {
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
    }
  }, [socket, user, roomId]);

  useEffect(() => {
    if (cameraDetectsFace && socket)
      socket.emit("client:addActiveMember", roomId);
    if (!cameraDetectsFace && socket)
      socket.emit("client:deleteActiveMember", roomId);
  }, [cameraDetectsFace, socket, roomId]);

  const getStatus = (userId) => {
    let status = "default";
    if (activeMembers.find((u) => u === userId)) status = "active";
    else if (onlineMembers.find((u) => u === userId)) status = "online";
    return status;
  };

  if (!isLoading && !user)
    return (
      <div className={classes.root}>
        <h1>You need to log in to see this page!</h1>
      </div>
    );

  if (isLoading || !user || !room || !socket)
    return <div className={classes.root}></div>;

  let DeskItems = members.map((user) => (
    <DeskCard key={user._id} user={user} status={getStatus(user._id)} />
  ));

  return (
    <div className={classes.root}>
      <UserProfile
        key={user._id}
        user={user}
        isActive={activeMembers.find((u) => u === user._id)}
        isOnline={onlineMembers.find((u) => u === user._id)}
        setCameraDetectsFace={setCameraDetectsFace}
      >
        <ChatPage currentRoom={room} />
      </UserProfile>
      <div className={classes.body}>
        <h1>{room.name}</h1>
        <p>{room.description}</p>
        <Grid itemProps={{ xs: 12, md: 4 }} items={DeskItems} />
      </div>
    </div>
  );
}

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

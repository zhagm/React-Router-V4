import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import "../styles/ChatPage.css";
import ChatBox from "../components/ChatBox";
import { addMessage } from "../actions/roomActions";

const ChatPage = ({
  socket,
  user,
  isLoading,
  currentRoom,
  messages = [],
  addMessage,
}) => {
  let [inputText, setInputText] = useState("");

  useEffect(() => {
    if (socket && user && currentRoom) {
      socket.emit("client:login", user);
      socket.emit("client:enterRoom", currentRoom._id);
      socket.on("server:userSentMessage", addMessage);
      socket.on("server:systemChatMessage", addMessage);
    }
    return () => {
      // cleanup
      if (socket) {
        socket.off("console.log");
        socket.off("server:enterRoom");
        socket.off("server:systemChatMessage");
        socket.off("server:userSentMessage");
        socket.off("server:getOnlineMembers");
        socket.off("server:getActiveMembers");
      }
    };
  }, [socket, user, currentRoom, addMessage]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (socket) {
      socket.emit("client:userSentMessage", inputText);
      setInputText("");
    }
  };

  if (isLoading || !user)
    return <div>You need to log in to start chatting!</div>;

  return (
    <div>
      <ChatBox messages={messages} currentUserId={user._id} />
      <form onSubmit={sendMessage}>
        <label>Your Message:</label>
        <input
          type="text"
          name="input"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <br />
      </form>
    </div>
  );
};

ChatPage.propTypes = {
  currentRoom: PropTypes.object.isRequired,
  socket: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  messages: PropTypes.array,
  addMessage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  isLoading: state.auth.isLoading,
  socket: state.socket.socket,
  messages: state.rooms.currentRoomMessages,
});

export default connect(mapStateToProps, { addMessage })(ChatPage);

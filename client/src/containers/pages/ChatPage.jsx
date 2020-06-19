import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { TextField, Button } from "@material-ui/core";
import ChatBox from "../../components/chat/ChatBox";
import { addMessage } from "../../redux/actions/roomActions";

/**
 * THIS CODE HAS NOT BEEN REFACTORED FROM PREVIOUS VERSION
 */
const ChatPage = ({
  socket,
  user,
  isLoading,
  currentRoom,
  messages = [],
  addMessage,
}) => {
  let [inputText, setInputText] = useState("");

  useEffect(() => {}, [messages]);

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
    if (inputText && socket) {
      socket.emit("client:userSentMessage", inputText);
      setInputText("");
    }
  };

  if (isLoading || !user)
    return <div>You need to log in to start chatting!</div>;

  return (
    <div>
      <ChatBox messages={messages} currentUserId={user._id} />
      <TextField
        type="text"
        name="input"
        value={inputText}
        variant="outlined"
        label=""
        onChange={(e) => setInputText(e.target.value)}
        style={{ width: "77%" }} // HARDCODED
        autoComplete={"off"}
      />
      <Button
        variant="contained"
        color="secondary"
        onClick={sendMessage}
        style={{ height: "55px", width: "20%" }} // HARDCODED
      >
        Send
      </Button>
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

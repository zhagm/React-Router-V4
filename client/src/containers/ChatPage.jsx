import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "../styles/ChatPage.css";
import ChatMessages from "../components/ChatMessages";
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
  let init = true;

  useEffect(() => {
    if (socket && user && currentRoom && init) {
      socket.emit("client:login", user);
      socket.emit("client:enterRoom", currentRoom._id);
      socket.on("server:userSentMessage", addMessage);
      socket.on("server:systemChatMessage", addMessage);
      init = false;
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
  }, [socket, user, currentRoom]);

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
      <ChatMessages messages={messages} currentUserId={user._id} />
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

ChatPage.propTypes = {};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  isLoading: state.auth.isLoading,
  socket: state.socket.socket,
  messages: state.rooms.currentRoomMessages,
});

export default connect(mapStateToProps, { addMessage })(ChatPage);

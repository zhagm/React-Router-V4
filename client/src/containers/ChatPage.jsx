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
  // let [messages, setMessages] = useState(currentRoomMessages);
  let init = true;

  useEffect(() => {
    if (socket && user && currentRoom && init) {
      socket.emit("client:login", user);
      socket.emit("client:enterRoom", currentRoom._id);
      socket.on("server:userSentMessage", addMessage);
      init = false;
    }
  }, [socket, user, currentRoom]);
  // useEffect(() => {
  //   if (socket && user && currentRoom) {
  //     socket.emit("client:login", user);
  //     socket.emit("client:enterRoom", currentRoom._id);
  //     socket.on("server:userSentMessage", addMessage);
  //   }
  // }, [socket, user, messages]);

  // const addMessage = (message) => {
  //   setMessages(messages.concat(message));
  // };

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
      <h1>USERS</h1>
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

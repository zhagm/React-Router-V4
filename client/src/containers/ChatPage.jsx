import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "../styles/ChatPage.css";
import { sendSocketMessage, getOnlineUsers } from "../actions/socketActions.js";

const ChatPage = ({
  user,
  isLoading,
  sendSocketMessage,
  messages,
  users,
  getOnlineUsers,
}) => {
  let [inputText, setInputText] = useState("");
  useEffect(() => {
    getOnlineUsers();
    // eslint-disable-next-line
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    sendSocketMessage(inputText);
    setInputText("");
  };

  if (isLoading || !user)
    return <div>You need to log in to start chatting!</div>;
  return (
    <div>
      <h1>USERS</h1>
      <div className="chatBox">
        {messages.map((msg, i) => (
          <div
            className={`chatMessage ${
              msg.username === user.name
                ? "ownChatMessage"
                : msg.username === "chatbot"
                ? "systemMessage"
                : ""
            }`}
            key={i}
          >
            <span className="messageUser">{msg.username}</span>
            <span className="messageText">{msg.text}</span>
            {/* <td>{msg.timestamp}</td> */}
          </div>
        ))}
      </div>
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
      <ul>
        {(users || []).map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

ChatPage.propTypes = {
  messages: PropTypes.array,
  users: PropTypes.array,
  sendSocketMessage: PropTypes.func,
  getOnlineUsers: PropTypes.func,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  isLoading: state.auth.isLoading,
  messages: state.socket.messages,
  users: state.socket.onlineUsers,
});

export default connect(mapStateToProps, { sendSocketMessage, getOnlineUsers })(
  ChatPage
);

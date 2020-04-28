import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "../styles/ChatPage.css";

import socket from "../socket-config.js";

const ChatPage = ({ user, isLoading }) => {
  let [inputText, setInputText] = useState("");
  let [messages, setMessages] = useState([]);
  socket.on("message", (msg) => {
    if (msg) addMessageToDom(msg);
  });

  useEffect(() => {
    console.log("REMOUNTING");
    let localStorageData;
    try {
      localStorageData = JSON.parse(localStorage.getItem("messages"));
    } catch {
      localStorageData = [];
    }
    setMessages(localStorageData || []);
    // eslint-disable-next-line
  }, []);

  const addMessageToDom = (message) => {
    const updatedMessages = [...messages, message].sort(
      (a, b) => a.timestamp < b.timestamp
    );
    localStorage.setItem("messages", JSON.stringify(updatedMessages));
    setMessages(updatedMessages);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    let message = {
      username: user.name,
      text: inputText,
      timestamp: Date.now(),
    };
    socket.emit("message", message);
    setInputText("");
  };

  if (isLoading) return <div></div>;
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
    </div>
  );
};

ChatPage.propTypes = {
  messages: PropTypes.array,
  getUsers: PropTypes.func,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  isLoading: state.auth.isLoading,
});
export default connect(mapStateToProps, {})(ChatPage);

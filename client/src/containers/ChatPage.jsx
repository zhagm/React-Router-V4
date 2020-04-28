import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import socketio from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4000";
const socket = socketio(ENDPOINT);

const ChatPage = ({ user }) => {
  let [inputText, setInputText] = useState("");
  let [messages, setMessages] = useState([
    {
      username: user.name,
      text: "hello",
      timestamp: Date.now(),
    },
  ]);
  socket.on("message", (msg) => {
    if (msg) addMessageToDom(msg);
  });

  useEffect(() => {
    setMessages(JSON.parse(localStorage.getItem("messages")) || []);
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

  return (
    <div>
      <h1>USERS</h1>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Message</th>
            <th>Time Sent</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((msg, i) => (
            <tr key={i}>
              <td>{msg.username}:</td>
              <td>{msg.text}</td>
              <td>{msg.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
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
});
export default connect(mapStateToProps, {})(ChatPage);

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getUsers } from "../actions/userActions";

import socketio from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4000";

const ChatPage = ({ user }) => {
  let [inputText, setInputText] = useState("");
  let [messages, setMessages] = useState([
    {
      user: user.name,
      text: "hello",
      timestamp: Date.now(),
    },
  ]);
  useEffect(() => {
    const socket = socketio(ENDPOINT);
    socket.on("message", (message) => {
      console.log({ message });
    });
    // eslint-disable-next-line
  }, []);

  const addMessageToDom = (message) => {
    const updatedMessages = [...messages, message].sort(
      (a, b) => a.timestamp < b.timestamp
    );
    setMessages(updatedMessages);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    let message = {
      user: user.name,
      text: inputText,
      timestamp: Date.now(),
    };
    addMessageToDom(message);
    // socket.emit("message", inputText);
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
              <td>{msg.user}:</td>
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

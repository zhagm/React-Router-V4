import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "../styles/ChatPage.css";
import UsersTable from "../components/UsersTable";
import ChatBox from "../components/ChatBox";
import { sendSocketMessage, getOnlineUsers } from "../actions/socketActions.js";
import { getUsers } from "../actions/userActions.js";

const ChatPage = ({
  user,
  isLoading,
  sendSocketMessage,
  messages = [],
  getOnlineUsers,
  onlineUsers = [],
  getUsers,
  users = [],
}) => {
  let [inputText, setInputText] = useState("");
  useEffect(() => {
    getOnlineUsers();
    getUsers();
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
      <UsersTable users={users} onlineUsers={onlineUsers.map((u) => u.id)} />
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
  onlineUsers: state.socket.onlineUsers,
  users: state.allUsers.users,
});

export default connect(mapStateToProps, {
  sendSocketMessage,
  getOnlineUsers,
  getUsers,
})(ChatPage);

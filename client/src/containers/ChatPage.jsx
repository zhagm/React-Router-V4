import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "../styles/ChatPage.css";
import UsersTable from "../components/UsersTable";
import ChatBox from "../components/ChatBox";
// import { loadUser } from "../actions/authActions";

const ChatPage = ({
  socket,
  user,
  // loadUser,
  isLoading,
  users = [],
  activeMembers,
  onlineMembers,
  allMembers,
  currentRoom,
}) => {
  let [inputText, setInputText] = useState("");
  let [messages, setMessages] = useState([]);
  useEffect(() => {
    console.log("messages changed", messages);
    // eslint-disable-next-line
  }, [messages]);

  useEffect(() => {
    if (socket && user && currentRoom) {
      socket.emit("client:login", user);
      socket.emit("client:enterRoom", currentRoom._id);
      socket.on("server:userSentMessage", (message) => {
        setMessages(messages.concat(message));
      });
    }
  }, [socket, user]);

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
      <UsersTable users={users} onlineUsers={[]} />
    </div>
  );
};

ChatPage.propTypes = {
  users: PropTypes.array,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  isLoading: state.auth.isLoading,
  users: state.allUsers.users,
  socket: state.socket.socket,
});

export default connect(mapStateToProps, {
  /*loadUser*/
})(ChatPage);

import React from "react";
import PropTypes from "prop-types";

const ChatBox = ({ messages = [], currentUserName }) => {
  return (
    <div className="chatBox">
      {messages.map((msg, i) => (
        <div
          className={`chatMessage ${
            msg.username === currentUserName
              ? "ownChatMessage"
              : msg.username === "chatbot"
              ? "systemMessage"
              : ""
          }`}
          key={i}
        >
          <span className="messageUser">{msg.username}</span>
          <span className="messageText">{msg.text}</span>
        </div>
      ))}
    </div>
  );
};

ChatBox.propTypes = {
  messages: PropTypes.array,
  currentUserName: PropTypes.string, // change to id later
};

export default ChatBox;

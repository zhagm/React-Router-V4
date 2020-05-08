import React from "react";
import PropTypes from "prop-types";

const ChatBox = ({ messages, currentUserId }) => {
  return (
    <div className="chatBox">
      {messages.map((msg, i) => (
        <div
          className={`chatMessage ${
            msg.userId === currentUserId
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
  currentUserId: PropTypes.string,
};

export default ChatBox;

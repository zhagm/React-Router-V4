import React from "react";
import PropTypes from "prop-types";

const ChatMessages = ({ messages, currentUserId }) => {
  return (
    <div className="chatBox">
      {messages
        .slice()
        .reverse()
        .map((msg, i) => (
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
      <div className="chatMessages"></div>
    </div>
  );
};

ChatMessages.propTypes = {
  messages: PropTypes.array,
  currentUserId: PropTypes.string,
};

export default ChatMessages;

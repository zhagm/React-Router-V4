import React from "react";
import PropTypes from "prop-types";

const ChatMessages = ({ messages, currentUserId }) => {
  const getMessageClasses = (msg) => {
    let classes = ["chatMessage"];
    if (msg.userId === currentUserId) {
      if (!msg.isSystemMessage) classes.push("ownChatMessage");
    } else if (msg.isSystemMessage) {
      classes.push("systemMessage");
    }

    if (msg.isSystemMessage) {
      classes.push("systemMessage");
    } else if (msg.userId === currentUserId) {
      classes.push("ownChatMessage");
    }
    return classes.join(" ");
  };

  return (
    <div className="chatBox">
      {messages
        .slice()
        .reverse()
        .map((msg, i) => (
          <div className={getMessageClasses(msg)} key={i}>
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

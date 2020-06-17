import React from "react";
import PropTypes from "prop-types";

import classnames from "../../utils/classnames";

/**
 * THIS CODE HAS NOT BEEN REFACTORED FROM PREVIOUS VERSION
 * Returns chat component.
 * @function ChatBox
 * @param {string} currentUserId - id of current user (for styling).
 * @param {array} messages - array of message objects.
 * @returns {div}``
 */
const ChatBox = ({ currentUserId, messages }) => {
  return (
    <div className="chatMessages">
      {messages
        .slice() // create copy to avoid reversing orig
        .reverse() // reversing to have messages pop up from bottom
        .map((msg, i) => (
          <div
            className={classnames("chatMessage", {
              ownChatMessage:
                msg.userId === currentUserId && !msg.isSystemMessage,
              systemMessage:
                msg.userId !== currentUserId && msg.isSystemMessage,
            })}
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
  currentUserId: PropTypes.string,
  messages: PropTypes.array,
};

export default ChatBox;

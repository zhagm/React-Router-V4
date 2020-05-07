import socketio from "socket.io-client";
import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  SOCKET_MESSAGE_SEND,
  EMIT_GET_USERS,
  USER_LOADED,
  GET_ROOM,
} from "../actions/types";
require("dotenv").config();

export const socketMiddlewareMaker = (url) => {
  const socket = socketio(url);

  return ({ dispatch }) => (next) => (action) => {
    const { type, payload } = action;
    switch (type) {
      case EMIT_GET_USERS:
        console.log("EMITTING GET USERS TO SERVER");
        socket.emit("client:getOnlineUsers");
        socket.on("server:getOnlineUsers", (onlineUsers) => {
          dispatch({ type: "SOCKET_USERS_RECEIVED", payload: onlineUsers });
        });
        break;
      case USER_LOADED:
        console.log("EMITTING LOGIN");
        socket.emit("client:login", payload);
        socket.on("server:removeUserOnline", (userId) => {
          dispatch({ type: "SOCKET_REMOVE_USER", payload: userId });
        });
        socket.on("server:addUserOnline", (userId) => {
          dispatch({ type: "SOCKET_ADD_USER", payload: userId });
        });
        break;
      case LOGIN_SUCCESS:
        console.log("EMITTING LOGIN");
        socket.emit("client:login", payload.user);
        break;
      case LOGOUT_SUCCESS:
        console.log("EMITTING LOGOUT");
        socket.emit("client:removeOnlineUser");
        break;
      case GET_ROOM:
        console.log("EMITTING ENTER ROOM ");
        socket.emit("client:enterRoom");
        break;
      case SOCKET_MESSAGE_SEND:
        console.log("EMITTING USER MESSAGE SENT", payload);
        socket.emit("client:userSentMessage", payload);
        break;
      // case LOGIN_SUCCESS:
      //   socket.emit("client:login", action.payload.user);
      //   break;
      // case USER_LOADED:
      //   socket.emit("client:login", action.payload); // NOT GOOD, RUNS A LOT
      //   socket.on("console.log", (message) => console.log("Server: ", message));
      //   socket.on("server:getOnlineUsers", (onlineUsers) => {
      //     dispatch({ type: "SOCKET_USERS_RECEIVED", payload: onlineUsers });
      //   });
      //   socket.on("sendUsersMessage", ({ userId, name, text }) => {
      //     dispatch({
      //       type: "SOCKET_MESSAGE_RECEIVED",
      //       payload: { userId, username: name, text },
      //     });
      //   });
      //   socket.on("server:addUserOnline", (userId) => {
      //     dispatch({ type: "SOCKET_ADD_USER", payload: userId });
      //   });
      //   socket.on("removeUserOnline", (userId) => {
      //     dispatch({ type: "SOCKET_REMOVE_USER", payload: userId });
      //   });
      //   break;
      // case SOCKET_MESSAGE_SEND:
      //   socket.emit("userSentMessage", action.payload);
      //   break;
      // case LOGOUT_SUCCESS: {
      //   socket.emit("removeUserOnline", action.payload);
      //   // socket.disconnect();
      //   break;
      // }
    }
    return next(action);
  };
};

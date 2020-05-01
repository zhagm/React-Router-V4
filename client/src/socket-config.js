import socketio from "socket.io-client";
import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  SOCKET_MESSAGE_SEND,
  SOCKET_GET_USERS,
  USER_LOADED,
} from "./actions/types";
require("dotenv").config();

export const socketMiddlewareMaker = (url) => {
  let socket = socketio(url);

  return ({ dispatch }) => (next) => (action) => {
    socket.on("UserAuthenticated", (userId) => {
      console.log("USER AUTHENTICATED!", userId);
    });
    switch (action.type) {
      case SOCKET_GET_USERS:
        socket.emit("getOnlineUsers");
        break;
      case LOGIN_SUCCESS:
        socket.emit("login", action.payload.user);
        break;
      case USER_LOADED:
        socket.emit("login", action.payload); // NOT GOOD, RUNS A LOT
        socket.on("console.log", (message) => console.log("Server: ", message));
        socket.on("getOnlineUsers", (onlineUsers) => {
          dispatch({ type: "SOCKET_USERS_RECEIVED", payload: onlineUsers });
        });
        socket.on("sendUsersMessage", ({ userId, name, text }) => {
          dispatch({
            type: "SOCKET_MESSAGE_RECEIVED",
            payload: { userId, username: name, text },
          });
        });
        socket.on("addUserOnline", (user) => {
          dispatch({ type: "SOCKET_ADD_USER", payload: user });
        });
        socket.on("removeUserOnline", (userId) => {
          dispatch({ type: "SOCKET_REMOVE_USER", payload: userId });
        });
        break;
      case SOCKET_MESSAGE_SEND:
        socket.emit("userSentMessage", action.payload);
        break;
      case LOGOUT_SUCCESS: {
        socket.emit("removeUserOnline", action.payload);
        break;
      }
    }
    return next(action);
  };
};

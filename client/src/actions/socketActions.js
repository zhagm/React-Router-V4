// import axios from "axios";
import { SOCKET_MESSAGE_SEND, SOCKET_GET_USERS } from "./types";
// import { getTokenHeader } from "./authActions";

export const sendSocketMessage = (text) => (dispatch) => {
  console.log("DISPATCHING SOCKET_MESSAGE_SEND ", text);
  dispatch({ type: SOCKET_MESSAGE_SEND, payload: text });
};

export const getOnlineUsers = () => (dispatch) => {
  dispatch({ type: SOCKET_GET_USERS });
};

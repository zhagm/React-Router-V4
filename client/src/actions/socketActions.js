// import axios from "axios";
import { SOCKET_MESSAGE_SEND, ASSIGN_SOCKET } from "./types";
// import { getTokenHeader } from "./authActions";

// export const sendSocketMessage = (text) => (dispatch) => {
//   dispatch({ type: SOCKET_MESSAGE_SEND, payload: text });
// };

export const createSocketConnection = (socket) => (dispatch) => {
  dispatch({ type: ASSIGN_SOCKET, payload: socket });
};

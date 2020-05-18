import { ASSIGN_SOCKET } from "./types";

export const createSocketConnection = (socket) => (dispatch) => {
  dispatch({ type: ASSIGN_SOCKET, payload: socket });
};

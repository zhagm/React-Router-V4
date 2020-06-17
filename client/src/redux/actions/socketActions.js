import { ASSIGN_SOCKET } from "./types";

// only needs to be called once, adds created socket connection to reducer
export const createSocketConnection = (socket) => (dispatch) => {
  dispatch({ type: ASSIGN_SOCKET, payload: socket });
};

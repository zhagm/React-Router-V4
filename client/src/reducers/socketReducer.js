import {
  SOCKET_MESSAGE_RECEIVED,
  SOCKET_ADD_USER,
  SOCKET_REMOVE_USER,
  SOCKET_USERS_RECEIVED,
  ASSIGN_SOCKET,
  LOGOUT_SUCCESS,
} from "../actions/types";

const initialState = {
  onlineUsers: [],
  messages: [],
  socket: null,
  isLoading: true,
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case ASSIGN_SOCKET:
      return { ...state, socket: payload, isLoading: false };
    case SOCKET_MESSAGE_RECEIVED:
      let messages = [...state.messages, payload].slice(-10);
      return {
        ...state,
        messages,
      };
    case SOCKET_ADD_USER:
      let onlineUsers = state.onlineUsers.filter(
        (userId) => userId !== payload
      );
      onlineUsers.push(payload);
      return {
        ...state,
        onlineUsers,
      };
    case SOCKET_REMOVE_USER:
      return {
        ...state,
        onlineUsers: state.onlineUsers.filter((userId) => userId !== payload),
      };
    case SOCKET_USERS_RECEIVED:
      return {
        ...state,
        onlineUsers: payload,
      };
    case LOGOUT_SUCCESS:
      state.socket.emit("client:logout");
      return state;
    default:
      return state;
  }
}

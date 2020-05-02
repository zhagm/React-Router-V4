import { combineReducers } from "redux";
import userReducer from "./userReducer";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import socketReducer from "./socketReducer";
import roomsReducer from "./roomsReducer";

export default combineReducers({
  allUsers: userReducer,
  auth: authReducer,
  error: errorReducer,
  socket: socketReducer,
  rooms: roomsReducer,
});

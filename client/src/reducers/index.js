import { combineReducers } from "redux";
import itemReducer from "./itemReducer";
import userReducer from "./userReducer";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import socketReducer from "./socketReducer";

export default combineReducers({
  item: itemReducer,
  allUsers: userReducer,
  auth: authReducer,
  error: errorReducer,
  socket: socketReducer,
});

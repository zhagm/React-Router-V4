import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
// import { socketMiddlewareMaker } from "./utils/socket-config.js";
require("dotenv").config();

const devTools =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
    : null;
const initialState = {};
// const SOCKET_URL =
//   process.env.REACT_APP_SERVER_URL ||
//   "https://officeplace-server.herokuapp.com";
// const socketMiddleware = socketMiddlewareMaker(SOCKET_URL);
// const composeArgs = [applyMiddleware(thunk, socketMiddleware)];
const composeArgs = [applyMiddleware(thunk)];
if (devTools) composeArgs.push(devTools);

const store = createStore(rootReducer, initialState, compose(...composeArgs));

console.log(process.env);

export default store;

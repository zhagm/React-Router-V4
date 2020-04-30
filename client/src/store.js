import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { socketMiddlewareMaker } from "./socket-config.js";
require("dotenv").config();

const devTools =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
    : null;
const initialState = {};
const SOCKET_URL = process.env.SOCKET_URL || "http://127.0.0.1:4000";
const socketMiddleware = socketMiddlewareMaker(SOCKET_URL);
const composeArgs = [applyMiddleware(thunk, socketMiddleware)];
if (devTools) composeArgs.push(devTools);

const store = createStore(rootReducer, initialState, compose(...composeArgs));

export default store;

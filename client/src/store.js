import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
require("dotenv").config();

const devTools =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
    : null;
const initialState = {};
const composeArgs = [applyMiddleware(thunk)];
if (devTools) composeArgs.push(devTools);

const store = createStore(rootReducer, initialState, compose(...composeArgs));

export default store;

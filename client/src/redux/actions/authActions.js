import axios from "axios";
import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "./types";
import { returnErrors } from "./errorActions";
require("dotenv").config();
const SERVER_URL =
  process.env.REACT_APP_SERVER_URL ||
  "https://officeplace-server.herokuapp.com";

// Register User
export const register = ({ name, email, password }) => (dispatch) => {
  const body = JSON.stringify({ name, email, password });
  return axios
    .post(`${SERVER_URL}/api/users`, body, getTokenHeader())
    .then(({ data }) => {
      dispatch({ type: REGISTER_SUCCESS, payload: data });
      dispatch({ type: USER_LOADED, payload: data.user });
      return true; // returns true if success
    })
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      );
      dispatch({ type: REGISTER_FAIL });
    });
};

// Login User
export const login = ({ email, password }) => (dispatch) => {
  const body = JSON.stringify({ email, password });
  return axios
    .post(`${SERVER_URL}/api/auth`, body, getTokenHeader())
    .then(({ data }) => {
      dispatch({ type: LOGIN_SUCCESS, payload: data });
      dispatch({ type: USER_LOADED, payload: data.user });
      return true; // returns true if success
    })
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      );
      dispatch({ type: LOGIN_FAIL });
    });
};

// Check token and load user
export const loadUser = () => (dispatch, getState) => {
  dispatch(setUserLoading());
  console.log(SERVER_URL);
  axios
    .get(`${SERVER_URL}/api/auth/user`, getTokenHeader(getState))
    .then(({ data }) => dispatch({ type: USER_LOADED, payload: data }))
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: AUTH_ERROR });
    });
};

// Get config object with token in header if logged in
export const getTokenHeader = (getState) => {
  const config = { headers: { "Content-type": "application/json" } };
  if (getState) {
    // getting token from redux auth state (token from localStorage)
    const { token } = getState().auth;
    if (token) config.headers["x-auth-token"] = token;
  }
  return config;
};

// Logout User
export const logout = () => ({ type: LOGOUT_SUCCESS });

// Set user as loading
export const setUserLoading = () => ({ type: USER_LOADING });

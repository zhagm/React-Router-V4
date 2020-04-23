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
} from "../actions/types";
import { returnErrors } from "./errorActions";

// Register User
export const register = ({ name, email, password }) => (dispatch) => {
  const body = JSON.stringify({ name, email, password });
  axios
    .post("http://localhost:4000/api/users", body, getTokenHeader())
    .then((res) => dispatch({ type: REGISTER_SUCCESS, payload: res.data }))
    .catch((err) => {
      let { data, status } = err.response;
      dispatch(returnErrors(data.msg, status, "REGISTER_FAIL"));
      dispatch({ type: REGISTER_FAIL });
    });
};

// Login User
export const login = ({ email, password }) => (dispatch) => {
  const body = JSON.stringify({ email, password });
  axios
    .post("http://localhost:4000/api/auth", body, getTokenHeader())
    .then(({ data }) => dispatch({ type: LOGIN_SUCCESS, payload: data }))
    .catch((err) => {
      let { data, status } = err.response;
      dispatch(returnErrors(data.msg, status, "LOGIN_FAIL"));
      dispatch({ type: LOGIN_FAIL });
    });
};

// Check token and load user
export const loadUser = () => (dispatch, getState) => {
  dispatch(setUserLoading());
  axios
    .get("http://localhost:4000/api/auth/user", getTokenHeader(getState))
    .then(({ data }) => dispatch({ type: USER_LOADED, payload: data }))
    .catch((err) => {
      let { data, status } = err.response;
      dispatch(returnErrors(data.msg, status));
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

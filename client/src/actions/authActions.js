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

// Check token and load user
export const loadUser = () => (dispatch, getState) => {
  dispatch(setUserLoading());
  axios
    .get("http://localhost:4000/api/auth/user", getConfigObj(getState))
    .then(({ data }) => dispatch({ type: USER_LOADED, payload: data }))
    .catch((err) => {
      let { data, status } = err.response;
      dispatch(returnErrors(data, status));
      dispatch({ type: AUTH_ERROR });
    });
};

export const getConfigObj = (getState) => {
  // getting token from redux auth state (token from localStorage)
  const { token } = getState().auth;
  const config = { headers: { "Content-type": "application/json" } };
  if (token) config.headers["x-auth-token"] = token;
  return config;
};

export const setUserLoading = () => ({ type: USER_LOADING });

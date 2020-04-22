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
    .post("http://localhost:4000/api/users", body, getConfigObj())
    .then((res) => dispatch({ type: REGISTER_SUCCESS, payload: res.data }))
    .catch((err) => {
      let { data, status } = err.response;
      dispatch(returnErrors(data.msg, status, "REGISTER_FAIL"));
      dispatch({ type: REGISTER_FAIL });
    });
};

// Check token and load user
export const loadUser = () => (dispatch, getState) => {
  dispatch(setUserLoading());
  axios
    .get(
      "http://localhost:4000/api/auth/user",
      getConfigObj(getState().auth.token)
    )
    .then(({ data }) => dispatch({ type: USER_LOADED, payload: data }))
    .catch((err) => {
      let { data, status } = err.response;
      dispatch(returnErrors(data.msg, status));
      dispatch({ type: AUTH_ERROR });
    });
};

// Logout User
export const logout = () => ({ type: LOGOUT_SUCCESS });

export const getConfigObj = (token) => {
  // getting token from redux auth state (token from localStorage)
  const config = { headers: { "Content-type": "application/json" } };
  if (token) config.headers["x-auth-token"] = token;
  return config;
};

export const setUserLoading = () => ({ type: USER_LOADING });

import axios from "axios";
import { returnErrors } from "./errorActions";
import { GET_USERS, USERS_LOADING } from "./types";
require("dotenv").config();
const SERVER_URL =
  process.env.REACT_APP_SERVER_URL ||
  "https://officeplace-server.herokuapp.com";

export const getUsers = () => {
  return (dispatch) => {
    dispatch(setUsersLoading());
    axios
      .get(`${SERVER_URL}/api/users`)
      .then(({ data }) => dispatch({ type: GET_USERS, payload: data }))
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
      });
  };
};

export const setUsersLoading = () => ({ type: USERS_LOADING });

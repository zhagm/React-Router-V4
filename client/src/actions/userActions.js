import axios from "axios";

import { GET_USERS, USERS_LOADING } from "./types";

export const getUsers = () => {
  return (dispatch) => {
    dispatch(setUsersLoading());
    axios
      .get("http://localhost:4000/api/users")
      .then(({ data }) => dispatch({ type: GET_USERS, payload: data }));
  };
};

export const setUsersLoading = () => ({ type: USERS_LOADING });

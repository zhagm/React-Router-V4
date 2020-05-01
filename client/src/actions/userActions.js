import axios from "axios";
import { returnErrors } from "./errorActions";
import { GET_USERS, USERS_LOADING } from "./types";

export const getUsers = () => {
  return (dispatch) => {
    dispatch(setUsersLoading());
    axios
      .get("https://officeplace-server.herokuapp.com/api/users")
      .then(({ data }) => dispatch({ type: GET_USERS, payload: data }))
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
      });
  };
};

export const setUsersLoading = () => ({ type: USERS_LOADING });

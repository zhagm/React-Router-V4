import axios from "axios";
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from "./types";
import { getTokenHeader } from "./authActions";
import { returnErrors } from "./errorActions";

/* returns all items in db */
export const getItems = () => (dispatch) => {
  dispatch(setItemsLoading());
  axios
    .get("https://officeplace-server.herokuapp.com/api/items")
    .then(({ data }) => dispatch({ type: GET_ITEMS, payload: data }))
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

/* accepts item object { text: _ }, returns new item */
export const addItem = ({ text }) => (dispatch, getState) => {
  dispatch(setItemsLoading());
  const body = JSON.stringify({ text });
  axios
    .post(
      "https://officeplace-server.herokuapp.com/api/items",
      body,
      getTokenHeader(getState)
    )
    .then(({ data }) => dispatch({ type: ADD_ITEM, payload: data }))
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

/* accepts item id, returns deleted item's id */
export const deleteItem = (id) => (dispatch, getState) => {
  axios
    .delete(
      `https://officeplace-server.herokuapp.com/api/items/${id}`,
      getTokenHeader(getState)
    )
    .then(({ data }) => dispatch({ type: DELETE_ITEM, payload: data._id }))
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const setItemsLoading = () => ({ type: ITEMS_LOADING });

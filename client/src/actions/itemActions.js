import axios from "axios";

import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from "./types";
import { getTokenHeader } from "./authActions";
import { returnErrors } from "./errorActions";

// thunk allows you to return a function that takes dispatch
// otherwise you'd have to return the action object

/* returns all items in db */
export const getItems = () => {
  return (dispatch) => {
    dispatch(setItemsLoading());
    axios
      .get("http://localhost:4000/api/items")
      .then(({ data }) => dispatch({ type: GET_ITEMS, payload: data }))
      .catch((err) => {
        const { data, status } = err.response;
        dispatch(returnErrors(data.msg, status));
      });
  };
};

/* accepts item object { text: _ }, returns new item */
export const addItem = (item) => (dispatch, getState) => {
  dispatch(setItemsLoading());
  axios
    .post("http://localhost:4000/api/items", item, getTokenHeader(getState))
    .then(({ data }) => dispatch({ type: ADD_ITEM, payload: data }))
    .catch((err) => {
      const { data, status } = err.response;
      dispatch(returnErrors(data.msg, status));
    });
};

/* accepts item id, returns deleted item's id */
export const deleteItem = (id) => (dispatch, getState) => {
  axios
    .delete(`http://localhost:4000/api/items/${id}`, getTokenHeader(getState))
    .then(({ data }) => dispatch({ type: DELETE_ITEM, payload: data._id }))
    .catch((err) => {
      const { data, status } = err.response;
      dispatch(returnErrors(data.msg, status));
    });
};

export const setItemsLoading = () => ({ type: ITEMS_LOADING });

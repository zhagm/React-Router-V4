import axios from "axios";

import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from "./types";

// thunk allows you to return a function that takes dispatch
// otherwise you'd have to return the action object

/* returns all items in db */
export const getItems = () => {
  return (dispatch) => {
    dispatch(setItemsLoading());
    axios
      .get("https://officeplace-server.herokuapp.com/api/items")
      .then(({ data }) => dispatch({ type: GET_ITEMS, payload: data }));
  };
};

/* accepts item object { text: _ }, returns new item */
export const addItem = (item) => (dispatch) => {
  dispatch(setItemsLoading());
  axios
    .post("https://officeplace-server.herokuapp.com/api/items", item)
    .then(({ data }) => dispatch({ type: ADD_ITEM, payload: data }));
};

export const deleteItem = () => ({ type: DELETE_ITEM });

export const setItemsLoading = () => ({ type: ITEMS_LOADING });

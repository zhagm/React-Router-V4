import axios from "axios";

import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from "./types";

// thunk allows you to return a function that takes dispatch
// otherwise you'd have to return the action object

export const getItems = () => {
  return (dispatch) => {
    dispatch(setItemsLoading());
    axios
      .get("http://localhost:4000/api/items")
      .then(({ data }) => dispatch({ type: GET_ITEMS, payload: data }));
  };
};

export const addItem = () => ({ type: ADD_ITEM });

export const deleteItem = () => ({ type: DELETE_ITEM });

export const setItemsLoading = () => ({ type: ITEMS_LOADING });

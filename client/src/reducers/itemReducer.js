import { GET_ITEMS, ADD_ITEM, DELETE_ITEM } from "../actions/types";

const initialState = {
  items: [],
};

export default function (state = initialState, action) {
  const { type } = action;
  switch (type) {
    case GET_ITEMS:
      console.log(`itemReducer:GET_ITEMS`);
      return state;
    case ADD_ITEM:
      break;
    case DELETE_ITEM:
      break;
    default:
      return state;
  }
}

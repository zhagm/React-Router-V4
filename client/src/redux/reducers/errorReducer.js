import { GET_ERRORS, CLEAR_ERRORS } from "../actions/types";

const initialState = {
  msg: "",
  status: null,
  id: null,
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case GET_ERRORS:
      const { msg, status, id } = payload;
      return { msg, status, id };
    case CLEAR_ERRORS:
      return {
        msg: "",
        status: null,
        id: null,
      };
    default:
      return state;
  }
}

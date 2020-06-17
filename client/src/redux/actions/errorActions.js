import { GET_ERRORS, CLEAR_ERRORS } from "./types";

// for error state reducer to update error
export const returnErrors = (msg, status, id = null) => ({
  type: GET_ERRORS,
  payload: { msg, status, id },
});

// clearing errors
export const clearErrors = () => ({ type: CLEAR_ERRORS });

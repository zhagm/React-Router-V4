import axios from "axios";
import {
  GET_ROOMS,
  GET_ROOM,
  ADD_ROOM,
  DELETE_ROOM,
  ROOMS_LOADING,
  ADD_ROOM_MEMBER,
  REMOVE_ROOM_MEMBER,
} from "../actions/types";
import { getTokenHeader } from "./authActions";
import { returnErrors } from "./errorActions";

/* returns all rooms in db */
export const getRooms = () => (dispatch) => {
  dispatch(setRoomsLoading());
  axios
    .get("http://localhost:4000/api/rooms")
    .then(({ data }) => dispatch({ type: GET_ROOMS, payload: data }))
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

/* accepts room object { name, admins, (members) }, returns new room */
export const addRoom = ({ name, admins, members }) => (dispatch, getState) => {
  dispatch(setRoomsLoading());
  const body = JSON.stringify({ name, admins, members });
  axios
    .post("http://localhost:4000/api/rooms", body, getTokenHeader(getState))
    .then(({ data }) => dispatch({ type: ADD_ROOM, payload: data }))
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

/* accepts room id, returns deleted room's id */
export const deleteRoom = (id) => (dispatch, getState) => {
  axios
    .delete(`http://localhost:4000/api/rooms/${id}`, getTokenHeader(getState))
    .then(({ data }) => dispatch({ type: DELETE_ROOM, payload: data._id }))
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

/* accepts room id and member id, returns added member id */
export const addRoomMember = (roomId, memberId) => (dispatch, getState) => {
  axios
    .post(
      `http://localhost:4000/api/rooms/${roomId}/members/${memberId}`,
      getTokenHeader(getState)
    )
    .then(({ data }) =>
      dispatch({ type: ADD_ROOM_MEMBER, payload: { room: data, memberId } })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

/* accepts room id and member id, returns deleted member id */
export const removeRoomMember = (roomId, memberId) => (dispatch, getState) => {
  axios
    .delete(
      `http://localhost:4000/api/rooms/${roomId}/members/${memberId}`,
      getTokenHeader(getState)
    )
    .then(({ data }) =>
      dispatch({
        type: REMOVE_ROOM_MEMBER,
        payload: { room: data, memberId },
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const setRoomsLoading = () => ({ type: ROOMS_LOADING });

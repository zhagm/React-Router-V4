import axios from "axios";
import {
  GET_ROOMS,
  GET_ROOM,
  ADD_ROOM,
  DELETE_ROOM,
  ROOMS_LOADING,
  ADD_ROOM_MEMBER,
  REMOVE_ROOM_MEMBER,
  GET_ROOM_MEMBERS,
} from "../actions/types";
import { getTokenHeader } from "./authActions";
import { returnErrors } from "./errorActions";
require("dotenv").config();
const SERVER_URL =
  process.env.REACT_APP_SERVER_URL ||
  "https://officeplace-server.herokuapp.com";

/* returns all rooms in db */
export const getRooms = () => (dispatch) => {
  dispatch(setRoomsLoading());
  axios
    .get(`${SERVER_URL}/api/rooms`)
    .then(({ data }) => dispatch({ type: GET_ROOMS, payload: data }))
    .catch((err) => {
      console.log("ERROR: ", err);
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

/* returns all member's rooms */
export const getMemberRooms = (memberId) => (dispatch, getState) => {
  axios
    .get(`${SERVER_URL}/api/rooms/members/${memberId}`)
    .then(({ data }) => dispatch({ type: GET_ROOMS, payload: data }))
    .catch((err) => {
      console.log("ERROR: ", err);
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

/* accepts room object { name, admins, (members) }, returns new room */
export const addRoom = ({ name, admins, members }) => (dispatch, getState) => {
  dispatch(setRoomsLoading());
  const body = JSON.stringify({ name, admins, members });
  axios
    .post(`${SERVER_URL}/api/rooms`, body, getTokenHeader(getState))
    .then(({ data }) => dispatch({ type: ADD_ROOM, payload: data }))
    .catch((err) => {
      console.log("ERROR: ", err);
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

/* accepts room id, returns deleted room's id */
export const deleteRoom = (id) => (dispatch, getState) => {
  axios
    .delete(`${SERVER_URL}/api/rooms/${id}`, getTokenHeader(getState))
    .then(({ data }) => dispatch({ type: DELETE_ROOM, payload: data._id }))
    .catch((err) => {
      console.log("ERROR: ", err);
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

/* accepts room id and member id, returns added member id */
export const addRoomMember = (roomId, memberId) => (dispatch, getState) => {
  axios
    .post(
      `${SERVER_URL}/api/rooms/${roomId}/members/${memberId}`,
      getTokenHeader(getState)
    )
    .then(({ data }) =>
      dispatch({ type: ADD_ROOM_MEMBER, payload: { room: data, memberId } })
    )
    .catch((err) => {
      console.log("ERROR: ", err);
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

/* accepts room id and member id, returns deleted member id */
export const removeRoomMember = (roomId, memberId) => (dispatch, getState) => {
  axios
    .delete(
      `${SERVER_URL}/api/rooms/${roomId}/members/${memberId}`,
      getTokenHeader(getState)
    )
    .then(({ data }) =>
      dispatch({
        type: REMOVE_ROOM_MEMBER,
        payload: { room: data, memberId },
      })
    )
    .catch((err) => {
      console.log("ERROR: ", err);
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

/* accepts room id, returns an array of members */
export const getRoomMembers = (roomId) => (dispatch, getState) => {
  axios
    .get(`${SERVER_URL}/api/rooms/${roomId}/members`, getTokenHeader(getState))
    .then(({ data }) =>
      dispatch({
        type: GET_ROOM_MEMBERS,
        payload: data,
      })
    )
    .catch((err) => {
      console.log("ERROR: ", err);
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

/* accepts room id, returns room object */
export const getRoom = (roomId) => (dispatch, getState) => {
  axios
    .get(`${SERVER_URL}/api/rooms/${roomId}`, getTokenHeader(getState))
    .then(({ data }) => {
      return dispatch({
        type: GET_ROOM,
        payload: data,
      });
    })
    .catch((err) => {
      console.log("ERROR: ", err);
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const setRoomsLoading = () => ({ type: ROOMS_LOADING });

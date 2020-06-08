import axios from "axios";
import {
  GET_ROOMS,
  ENTER_ROOM,
  LEAVE_ROOM,
  ADD_ROOM,
  DELETE_ROOM,
  ROOMS_LOADING,
  ADD_ROOM_MEMBER,
  REMOVE_ROOM_MEMBER,
  GET_ROOM_MEMBERS,
  ADD_MESSAGE,
} from "../actions/types";
import { getTokenHeader } from "./authActions";
import { returnErrors } from "./errorActions";
require("dotenv").config();
const SERVER_URL =
  process.env.REACT_APP_SERVER_URL ||
  "https://officeplace-server.herokuapp.com";

// adds message to currentRoomMessages, returns updated messages
export const addMessage = (newMessage) => (dispatch) => {
  dispatch({ type: ADD_MESSAGE, payload: newMessage });
};

// returns all rooms in db
export const getRooms = () => (dispatch) => {
  dispatch(setRoomsLoading());
  axios
    .get(`${SERVER_URL}/api/rooms`)
    .then(({ data }) => dispatch({ type: GET_ROOMS, payload: data }))
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// returns all member's rooms
export const getMemberRooms = (memberId) => (dispatch, getState) => {
  axios
    .get(`${SERVER_URL}/api/rooms/members/${memberId}`)
    .then(({ data }) => dispatch({ type: GET_ROOMS, payload: data }))
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// accepts room object { name, admins, (members) }, returns new room
export const addRoom = ({ name, admins, members, image, description }) => (
  dispatch,
  getState
) => {
  dispatch(setRoomsLoading());
  const body = JSON.stringify({ name, admins, members, image, description });
  axios
    .post(`${SERVER_URL}/api/rooms`, body, getTokenHeader(getState))
    .then(({ data }) => dispatch({ type: ADD_ROOM, payload: data }))
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// accepts room id, returns deleted room's id
export const deleteRoom = (id) => (dispatch, getState) => {
  axios
    .delete(`${SERVER_URL}/api/rooms/${id}`, getTokenHeader(getState))
    .then(({ data }) => dispatch({ type: DELETE_ROOM, payload: data._id }))
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// accepts room id and member id, returns added member id
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
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// accepts room id and member id, returns deleted member id
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
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// accepts room id, returns an array of members
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
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// accepts room id, returns room object
export const enterRoom = (roomId) => (dispatch, getState) => {
  axios
    .get(`${SERVER_URL}/api/rooms/${roomId}`, getTokenHeader(getState))
    .then(({ data }) => {
      return dispatch({
        type: ENTER_ROOM,
        payload: data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// removes current room from state
export const leaveRoom = () => (dispatch) => {
  dispatch({ type: LEAVE_ROOM });
};

// set rooms as loading (while waiting for rooms data)
export const setRoomsLoading = () => ({ type: ROOMS_LOADING });

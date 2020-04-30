import {
  GET_ROOMS,
  GET_ROOM,
  ADD_ROOM,
  DELETE_ROOM,
  ROOMS_LOADING,
  ADD_ROOM_MEMBER,
  REMOVE_ROOM_MEMBER,
} from "../actions/types";

const initialState = {
  rooms: [],
  loading: false,
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case GET_ROOMS: {
      return {
        ...state,
        rooms: payload,
        loading: false,
      };
    }
    case ROOMS_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case ADD_ROOM: {
      let rooms = [...state.rooms];
      if (rooms.every((r) => r._id !== payload._id)) rooms.unshift(payload);
      return {
        ...state,
        rooms,
      };
    }
    case DELETE_ROOM: {
      return {
        ...state,
        rooms: state.rooms.filter((r) => r._id !== payload._id),
      };
    }
    case REMOVE_ROOM_MEMBER: {
      let { room, memberId } = payload;
      let rooms = state.rooms.map((r) => {
        if (r._id !== room._id) return r;
        r.members.filter((id) => id !== memberId);
        return r;
      });
      return {
        ...state,
        rooms,
      };
    }
    case ADD_ROOM_MEMBER: {
      let { room, memberId } = payload;
      let rooms = state.rooms.map((r) => {
        if (r._id !== room._id) return r;
        r.members.filter((id) => id !== memberId);
        r.members.push(memberId);
        return r;
      });
      return {
        ...state,
        rooms,
      };
    }
    default:
      return state;
  }
}

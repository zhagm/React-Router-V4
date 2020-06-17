import {
  GET_ROOMS,
  ENTER_ROOM,
  ADD_ROOM,
  DELETE_ROOM,
  ROOMS_LOADING,
  ADD_ROOM_MEMBER,
  REMOVE_ROOM_MEMBER,
  GET_ROOM_MEMBERS,
  ADD_MESSAGE,
  LEAVE_ROOM,
} from "../actions/types";

const initialState = {
  rooms: [],
  currentRoomMembers: [],
  currentRoomMessages: [],
  currentRoom: null,
  loading: false,
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case GET_ROOMS: {
      return {
        ...state,
        rooms: payload.sort(
          (a, b) => new Date(b.register_date) - new Date(a.register_date)
        ),
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
    case GET_ROOM_MEMBERS: {
      return {
        ...state,
        currentRoomMembers: payload,
      };
    }
    case ENTER_ROOM: {
      return {
        ...state,
        currentRoom: payload,
      };
    }
    case ADD_MESSAGE: {
      return {
        ...state,
        currentRoomMessages: state.currentRoomMessages.concat(payload),
      };
    }
    case LEAVE_ROOM: {
      return { ...initialState };
    }
    default:
      return state;
  }
}

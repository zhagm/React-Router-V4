import socketio from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4000";
const socket = socketio(ENDPOINT);

export default socket;

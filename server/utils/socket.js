const socketio = require("socket.io");
const Eventhandler = require("./EventHandlers");

function init(server) {
  const io = socketio(server);
  io.on("connection", (serverSocket) => {
    const handler = new Eventhandler({ io, serverSocket });
    serverSocket.on("login", handler.login);
    serverSocket.on("userSentMessage", handler.receiveMessage);
    serverSocket.on("getOnlineUsers", handler.getOnlineUsers);
    serverSocket.on("removeUserOnline", handler.removeUserOnline);
    serverSocket.on("disconnect", handler.removeUserOnline);
  });

  return io;
}

module.exports = init;

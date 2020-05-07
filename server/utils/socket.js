const socketio = require("socket.io");
const Eventhandler = require("./EventHandlers");

function init(server) {
  const io = socketio(server);
  io.on("connection", (serverSocket) => {
    const handler = new Eventhandler({ io, serverSocket });
    serverSocket.on("client:login", handler.login); // login
    serverSocket.on("client:userSentMessage", handler.receiveMessage); // userSentMessage
    serverSocket.on("client:getOnlineUsers", handler.getOnlineUsers); // getOnlineUsers
    serverSocket.on("client:getOnlineMembers", handler.getOnlineMembers); // getOnlineMembers
    serverSocket.on("client:removeOnlineUser", handler.removeUserOnline); // removeUserOnline
    serverSocket.on("client:enterRoom", handler.enterRoom);
    serverSocket.on("client:leaveRoom", handler.leaveRoom);
    serverSocket.on("disconnect", handler.removeUserOnline);
  });

  return io;
}

module.exports = init;

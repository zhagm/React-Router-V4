const socketio = require("socket.io");
const Eventhandler = require("./EventHandlers");

function init(server) {
  const io = socketio(server);
  io.on("connection", (serverSocket) => {
    const handler = new Eventhandler({ io, serverSocket });
    serverSocket.on("client:login", handler.login);

    serverSocket.on("client:userSentMessage", handler.receiveMessage);

    serverSocket.on("client:getOnlineUsers", handler.getOnlineUsers);
    serverSocket.on("client:removeOnlineUser", handler.removeUserOnline);

    serverSocket.on("client:getOnlineMembers", handler.getOnlineMembers);

    serverSocket.on("client:getActiveMembers", handler.getActiveMembers);
    serverSocket.on("client:addActiveMember", handler.addActiveMember);
    serverSocket.on("client:deleteActiveMember", handler.deleteActiveMember);

    serverSocket.on("client:enterRoom", handler.enterRoom);
    serverSocket.on("client:leaveRoom", handler.leaveRoom);

    serverSocket.on("disconnect", handler.removeUserOnline);
  });

  return io;
}

module.exports = init;

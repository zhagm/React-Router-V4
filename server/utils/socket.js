const socketio = require("socket.io");
const Eventhandler = require("./EventHandlers");

function init(server) {
  const io = socketio(server);
  io.on("connection", (serverSocket) => {
    const handler = new Eventhandler({ io, serverSocket });
    serverSocket.on("client:login", handler.getHandler("client:login"));
    serverSocket.on("client:logout", handler.getHandler("client:logout"));

    serverSocket.on(
      "client:userSentMessage",
      handler.getHandler("client:userSentMessage")
    );

    serverSocket.on(
      "client:getOnlineUsers",
      handler.getHandler("client:getOnlineUsers")
    );

    serverSocket.on(
      "client:getOnlineMembers",
      handler.getHandler("client:getOnlineMembers")
    );

    serverSocket.on(
      "client:getActiveMembers",
      handler.getHandler("client:getActiveMembers")
    );
    serverSocket.on(
      "client:addActiveMember",
      handler.getHandler("client:addActiveMember")
    );
    serverSocket.on(
      "client:deleteActiveMember",
      handler.getHandler("client:deleteActiveMember")
    );

    serverSocket.on("client:enterRoom", handler.getHandler("client:enterRoom"));
    serverSocket.on("client:leaveRoom", handler.getHandler("client:leaveRoom"));

    serverSocket.on("disconnect", handler.getHandler("disconnect"));
  });

  return io;
}

module.exports = init;

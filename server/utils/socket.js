const socketio = require("socket.io");
const Eventhandler = require("./EventHandlers");

function init(server) {
  const io = socketio(server);
  io.on("connection", (client) => {
    const handler = new Eventhandler({ io, client });
    client.on("client:login", handler.getHandler("client:login"));
    client.on("client:logout", handler.getHandler("client:logout"));

    client.on(
      "client:getOnlineCounts",
      handler.getHandler("client:getOnlineCounts")
    );

    client.on(
      "client:userSentMessage",
      handler.getHandler("client:userSentMessage")
    );

    client.on(
      "client:getOnlineUsers",
      handler.getHandler("client:getOnlineUsers")
    );

    client.on(
      "client:getOnlineMembers",
      handler.getHandler("client:getOnlineMembers")
    );

    client.on(
      "client:getActiveMembers",
      handler.getHandler("client:getActiveMembers")
    );
    client.on(
      "client:addActiveMember",
      handler.getHandler("client:addActiveMember")
    );
    client.on(
      "client:deleteActiveMember",
      handler.getHandler("client:deleteActiveMember")
    );

    client.on("client:enterRoom", handler.getHandler("client:enterRoom"));
    client.on("client:leaveRoom", handler.getHandler("client:leaveRoom"));

    client.on("disconnect", handler.getHandler("disconnect"));
  });

  return io;
}

module.exports = init;

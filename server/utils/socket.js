const socketio = require("socket.io");
const { addUserOnline, removeUserOnline, getOnlineUsers } = require("./users");

function init(server) {
  const io = socketio(server);
  io.on("connection", (serverSocket) => {
    let user;
    serverSocket.on("login", (userObject) => {
      if (userObject && !user) {
        user = userObject;
        addUserOnline({ name: user.name, id: user._id });
        io.emit("addUserOnline", { name: user.name, id: user._id });
        io.emit(
          "console.log",
          `User ${user.name} is now online, ${io.engine.clientsCount} users online`
        );
      }
    });
    serverSocket.on("userSentMessage", (text) => {
      if (user) {
        io.emit("sendUsersMessage", {
          userId: user._id,
          name: user.name,
          text,
        });
      }
    });
    serverSocket.on("getOnlineUsers", () => {
      let onlineUsers = getOnlineUsers();
      serverSocket.emit("getOnlineUsers", onlineUsers);
    });
    serverSocket.on("removeUserOnline", () => {
      if (user) {
        removeUserOnline(user._id);
        io.emit("removeUserOnline", user._id);
        user = undefined;
        // socket.disconnect();
      }
    });
  });

  return io;
}

module.exports = init;

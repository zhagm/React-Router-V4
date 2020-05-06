const UsersStore = require("./users");

class EventHandler {
  constructor({ io, serverSocket, user = null }) {
    this.io = io;
    this.serverSocket = serverSocket;
    this.user = user;
  }
  getOnlineUsers = () => {
    let { io, serverSocket, user } = this;
    let onlineUsers = UsersStore.getOnlineUsers();
    serverSocket.emit("getOnlineUsers", onlineUsers);
  };
  login = (userObject) => {
    let { io, serverSocket, user } = this;
    if (userObject && !user) {
      user = userObject;
      UsersStore.addUserOnline(user._id);
      io.emit("addUserOnline", { name: user.name, id: user._id });
      io.emit(
        "console.log",
        `User ${user.name} is now online, ${io.engine.clientsCount} users online`
      );
    }
  };
  receiveMessage = (text) => {
    let { io, serverSocket, user } = this;
    if (user) {
      io.emit("sendUsersMessage", {
        userId: user._id,
        name: user.name,
        text,
      });
    }
  };
  removeUserOnline = () => {
    let { io, serverSocket, user } = this;
    if (user) {
      UsersStore.removeUserOnline(user._id);
      io.emit("removeUserOnline", user._id);
      user = undefined;
    }
  };
}

module.exports = EventHandler;

const { onlineUsers } = require("./redisStore");

class EventHandler {
  constructor({ io, serverSocket, user = null }) {
    this.io = io;
    this.serverSocket = serverSocket;
    this.user = user;
  }
  getOnlineUsers = () => {
    let { io, serverSocket, user } = this;
    onlineUsers.get().then((onlineUsers) => {
      console.log("ONLINE USERS:", onlineUsers);
      serverSocket.emit("getOnlineUsers", onlineUsers);
    });
  };
  login = (userObject) => {
    let { io, serverSocket, user } = this;
    if (userObject && !user) {
      this.user = userObject;
      onlineUsers.post(this.user._id);
      io.emit("addUserOnline", this.user._id);
      io.emit(
        "console.log",
        `User ${this.user.name} is now online, ${io.engine.clientsCount} users online`
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
      onlineUsers.delete(user._id);
      io.emit("removeUserOnline", user._id);
      this.user = undefined;
    }
  };
}

module.exports = EventHandler;

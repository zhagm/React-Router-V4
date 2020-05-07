const { onlineUsers, room } = require("./redisStore");

class EventHandler {
  constructor({ io, serverSocket, user = null, currentRoomId }) {
    this.io = io;
    this.serverSocket = serverSocket;
    this.user = user;
    this.currentRoomId = currentRoomId;
  }

  getOnlineUsers = () => {
    let { io, serverSocket, user } = this;
    onlineUsers
      .get()
      .then((onlineUsers) => {
        serverSocket.emit("server:getOnlineUsers", [...onlineUsers]);
      })
      .catch((err) => console.log(err));
  };
  login = (userObject) => {
    let { io, serverSocket, user } = this;
    if (userObject && !user) {
      this.user = userObject;
      onlineUsers.post(this.user._id);
      io.emit("server:addUserOnline", this.user._id);
      io.emit(
        "console.log",
        `User ${this.user.name} is now online, ${io.engine.clientsCount} users online`
      );
    }
  };
  getOnlineMembers = (roomId) => {
    let { io, serverSocket, user } = this;
    if (user) {
      room.get(roomId).then((users) => {
        console.log("USERS", users);
        serverSocket.emit("server:getOnlineMembers", users);
      });
    }
  };
  receiveMessage = (text) => {
    let { io, serverSocket, user } = this;
    if (user) {
      io.emit("server:userSentMessage", {
        userId: user._id,
        name: user.name,
        text,
      });
    }
  };
  enterRoom = (roomId) => {
    let { io, serverSocket, user } = this;
    if (user) {
      serverSocket.join(roomId);
      this.currentRoomId = roomId;
      room.post(roomId, user._id);
      io.emit("server:enterRoom", user._id); // emit only to other users in room
      io.in(roomId).emit(
        "console.log",
        `user ${user.name} just entered room ${roomId}`
      );
    }
  };
  leaveRoom = (roomId) => {
    let { io, serverSocket, user } = this;
    if (user) {
      serverSocket.leave(roomId);
      this.currentRoomId = null;
      room.delete(roomId, user._id);
      io.emit("server:leaveRoom", user._id); // emit only to other users in room
      io.in(roomId).emit(
        "console.log",
        `user ${user.name} just left room ${roomId}`
      );
    }
  };
  removeUserOnline = () => {
    console.log("REMOVING USER ONLINE");
    let { io, serverSocket, user } = this;
    if (user) {
      onlineUsers.delete(user._id);
      io.emit("server:removeUserOnline", user._id);
      this.user = undefined;
    }
  };
}

module.exports = EventHandler;

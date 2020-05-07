const { onlineUsers, room } = require("./redisStore");

class EventHandler {
  constructor({ io, serverSocket, user = null, currentRoomId }) {
    this.io = io;
    this.serverSocket = serverSocket;
    this.user = user;
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
      room.onlineUsers.get(roomId).then((users) => {
        serverSocket.emit("server:getOnlineMembers", users);
      });
    }
  };
  getActiveMembers = (roomId) => {
    let { io, serverSocket, user } = this;
    if (user) {
      room.activeUsers.get(roomId).then((users) => {
        serverSocket.emit("server:getActiveMembers", users);
      });
    }
  };
  addActiveMember = (roomId) => {
    let { io, serverSocket, user } = this;
    if (user) {
      room.activeUsers
        .post(roomId, user._id)
        .then(() => room.activeUsers.get(roomId))
        .then((activeUsers) => {
          console.log(`ACTIVE (add${roomId})---->`, activeUsers);
          io.in(roomId).emit("server:getActiveMembers", activeUsers);
        });
    }
  };
  deleteActiveMember = (roomId) => {
    let { io, serverSocket, user } = this;
    if (user) {
      room.activeUsers
        .delete(roomId, user._id)
        .then(() => room.activeUsers.get(roomId))
        .then((activeUsers) => {
          console.log(`ACTIVE (delete${roomId})---->`, activeUsers);
          io.in(roomId).emit("server:getActiveMembers", activeUsers);
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
      room.onlineUsers.post(roomId, user._id);
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
      room.onlineUsers.delete(roomId, user._id);
      room.activeUsers.delete(roomId, user._id);
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

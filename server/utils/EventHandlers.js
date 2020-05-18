const { onlineUsers, room } = require("./redisStore");

class EventHandler {
  constructor({ io, client, user = null, currentRoomId }) {
    this.io = io;
    this.client = client;
    this.user = user;
    this.currentRoomId = currentRoomId;
  }
  getHandler(event) {
    let dictionary = {
      "client:login": this.login,
      "client:logout": this.logout,
      "client:userSentMessage": this.receiveMessage,
      "client:getOnlineUsers": this.getOnlineUsers,
      "client:getOnlineMembers": this.getOnlineMembers,
      "client:getActiveMembers": this.getActiveMembers,
      "client:addActiveMember": this.addActiveMember,
      "client:deleteActiveMember": this.deleteActiveMember,
      "client:enterRoom": this.enterRoom,
      "client:leaveRoom": this.leaveRoom,
      disconnect: this.logout,
    };
    console.log(event);
    return dictionary[event];
  }
  getOnlineUsers = () => {
    let { client } = this;
    onlineUsers
      .get()
      .then((onlineUsers) => {
        client.emit("server:getOnlineUsers", [...onlineUsers]);
      })
      .catch((err) => console.log(err));
  };
  login = (userObject) => {
    let { io, user } = this;
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
    let { client, user } = this;
    if (user) {
      room.onlineUsers.get(roomId).then((users) => {
        client.emit("server:getOnlineMembers", users);
      });
    }
  };
  getActiveMembers = (roomId) => {
    let { client, user } = this;
    if (user) {
      room.activeUsers.get(roomId).then((users) => {
        client.emit("server:getActiveMembers", users);
      });
    }
  };
  addActiveMember = (roomId) => {
    let { io, user } = this;
    if (user) {
      room.activeUsers
        .post(roomId, user._id)
        .then(() => room.activeUsers.get(roomId))
        .then((activeUsers) => {
          io.in(roomId).emit("server:getActiveMembers", activeUsers);
        });
    }
  };
  deleteActiveMember = (roomId) => {
    let { io, user } = this;
    if (user) {
      room.activeUsers
        .delete(roomId, user._id)
        .then(() => room.activeUsers.get(roomId))
        .then((activeUsers) => {
          io.in(roomId).emit("server:getActiveMembers", activeUsers);
        });
    }
  };
  receiveMessage = (text) => {
    let { io, user, currentRoomId } = this;
    if (user) {
      io.in(currentRoomId).emit("console.log", user.name, text);
      io.in(currentRoomId).emit("server:userSentMessage", {
        userId: user._id,
        username: user.name,
        text,
        timestamp: Date.now(),
      });
    }
  };
  sendSystemMessage = (text, roomId) => {
    let { client, user, currentRoomId } = this;
    if (user && currentRoomId) {
      client.broadcast.to(roomId).emit("server:systemChatMessage", {
        userId: user._id,
        username: user.name,
        text,
        timestamp: Date.now(),
        isSystemMessage: true,
      });
    }
  };
  enterRoom = (roomId) => {
    let { io, client, user, currentRoomId } = this;
    if (user && !currentRoomId) {
      client.join(roomId);
      this.currentRoomId = roomId;
      room.onlineUsers.post(roomId, user._id);
      io.emit("server:enterRoom", user._id); // emit only to other users in room
      this.sendSystemMessage(`user ${user.name} just entered the room`, roomId);
      io.in(roomId).emit(
        "console.log",
        `user ${user.name} just entered room ${roomId}`
      );
    }
  };
  leaveRoom = (roomId) => {
    let { io, client, user, currentRoomId } = this;
    if (user && currentRoomId) {
      client.leave(roomId);
      this.currentRoomId = undefined;
      room.onlineUsers.delete(roomId, user._id);
      room.activeUsers.delete(roomId, user._id);
      io.emit("server:leaveRoom", user._id); // emit only to other users in room
      this.sendSystemMessage(`user ${user.name} left the room`, roomId);
    }
  };
  logout = () => {
    let { io, user, currentRoomId } = this;
    if (user) {
      onlineUsers.delete(user._id);
      this.leaveRoom(currentRoomId);
      this.currentRoomId = undefined;
      io.emit("server:logout", user._id);
      this.user = undefined;
    }
  };
}

module.exports = EventHandler;

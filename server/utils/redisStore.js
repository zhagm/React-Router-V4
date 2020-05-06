const redis = require("redis");
const client = redis.createClient();

const getOnlineUsers = async () => {
  return new Promise((resolve, reject) => {
    client.SMEMBERS("online", (err, users) => {
      if (err) reject(err);
      else resolve([...users]);
    });
  });
};

const postUsersOnline = (id) => {
  return new Promise((resolve, reject) => {
    client.SADD("online", id, (err, usersLength) => {
      if (err) reject(err);
      else resolve(usersLength);
    });
  });
};

const deleteUserOnline = (id) => {
  return new Promise((resolve, reject) => {
    client.SREM("online", id, (err, usersLength) => {
      if (err) reject(err);
      else resolve(usersLength);
    });
  });
};

const getRoomUsers = async (roomId) => {
  return new Promise((resolve, reject) => {
    client.SMEMBERS(`${roomId}`, (err, users) => {
      if (err) reject(err);
      else resolve([...users]);
    });
  });
};

const postRoomUsers = (roomId, userId) => {
  return new Promise((resolve, reject) => {
    client.SADD(`${roomId}`, userId, (err, usersLength) => {
      if (err) reject(err);
      else resolve(usersLength);
    });
  });
};

const deleteRoomUsers = (roomId, userId) => {
  return new Promise((resolve, reject) => {
    client.SREM(`${roomId}`, userId, (err, usersLength) => {
      if (err) reject(err);
      else resolve(usersLength);
    });
  });
};

module.exports = {
  onlineUsers: {
    get: getOnlineUsers,
    post: postUsersOnline,
    delete: deleteUserOnline,
  },
  room: {
    get: getRoomUsers,
    post: postRoomUsers,
    delete: deleteRoomUsers,
  },
};

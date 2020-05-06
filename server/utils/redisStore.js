const redis = require("redis");
const client = redis.createClient();

const getOnlineUsers = async () => {
  return new Promise((resolve, reject) => {
    client.SMEMBERS("online", (err, users) => {
      if (err) reject(err);
      else resolve(users);
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

module.exports = {
  onlineUsers: {
    post: postUsersOnline,
    delete: deleteUserOnline,
    get: getOnlineUsers,
  },
};

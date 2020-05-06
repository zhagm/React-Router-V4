const redis = require("redis");
const client = redis.createClient();

// client.FLUSHDB(); // to clear all data from redis

const addUserOnline = (id) => {
  client.SADD("online", id, (err, users) => {
    if (err) console.error(err);
    else {
      console.log(`addUserOnline->${users}`);
      return users;
    }
  });
};

const removeUserOnline = (id) => {
  client.SREM("online", id, (err, users) => {
    if (err) console.error(err);
    else {
      console.log(`removeUserOnline->${users}`);
      return users;
    }
  });
};

const getOnlineUsers = () => {
  client.SMEMBERS("online", (err, users) => {
    if (err) console.error(err);
    else {
      console.log(`getOnlineUsers->${users}`);
      return users;
    }
  });
};

module.exports = {
  addUserOnline,
  removeUserOnline,
  getOnlineUsers,
};

const redis = require("redis");
let client;
if (process.env.REDIS_URL) {
  client = redis.createClient(process.env.REDIS_URL, { no_ready_check: true });
} else {
  client = redis.createClient();
}

client.FLUSHALL();

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

const getOnlineRoomUsers = async (roomId) => {
  return new Promise((resolve, reject) => {
    client.SMEMBERS(`${roomId}-ONLINE`, (err, users) => {
      if (err) reject(err);
      else resolve([...users]);
    });
  });
};

const postOnlineRoomUsers = (roomId, userId) => {
  return new Promise((resolve, reject) => {
    client.SADD(`${roomId}-ONLINE`, userId, (err, usersLength) => {
      if (err) reject(err);
      else resolve(usersLength);
    });
  });
};

const deleteOnlineRoomUsers = (roomId, userId) => {
  return new Promise((resolve, reject) => {
    client.SREM(`${roomId}-ONLINE`, userId, (err, usersLength) => {
      if (err) reject(err);
      else resolve(usersLength);
    });
  });
};

const getActiveRoomUsers = async (roomId) => {
  return new Promise((resolve, reject) => {
    client.SMEMBERS(`${roomId}-ACTIVE`, (err, users) => {
      if (err) reject(err);
      else resolve([...users]);
    });
  });
};

const postActiveRoomUsers = (roomId, userId) => {
  return new Promise((resolve, reject) => {
    client.SADD(`${roomId}-ACTIVE`, userId, (err, usersLength) => {
      if (err) reject(err);
      else resolve(usersLength);
    });
  });
};

const deleteActiveRoomUsers = (roomId, userId) => {
  return new Promise((resolve, reject) => {
    client.SREM(`${roomId}-ACTIVE`, userId, (err, usersLength) => {
      if (err) reject(err);
      else {
        resolve(usersLength);
      }
    });
  });
};

const getRoomsOnlineCount = async (roomIds) => {
  let promisesArr = roomIds.map((id) => {
    return new Promise((resolve, reject) => {
      client.SMEMBERS(`${id}-ONLINE`, (err, users) => {
        if (err) reject(err);
        else resolve({ id: id, count: users.length });
      });
    });
  });
  return Promise.all(promisesArr).then((values) => {
    return values.reduce((res, { id, count }) => {
      res[id] = count;
      return res;
    }, {});
  });
};

const getRoomsActiveCount = async (roomIds) => {
  let promisesArr = roomIds.map((id) => {
    return new Promise((resolve, reject) => {
      client.SMEMBERS(`${id}-ACTIVE`, (err, users) => {
        if (err) reject(err);
        else resolve({ id: id, count: users.length });
      });
    });
  });
  return Promise.all(promisesArr).then((values) => {
    return values.reduce((res, { id, count }) => {
      res[id] = count;
      return res;
    }, {});
  });
};

module.exports = {
  onlineUsers: {
    get: getOnlineUsers,
    post: postUsersOnline,
    delete: deleteUserOnline,
  },
  room: {
    onlineUsers: {
      get: getOnlineRoomUsers,
      post: postOnlineRoomUsers,
      delete: deleteOnlineRoomUsers,
    },
    activeUsers: {
      get: getActiveRoomUsers,
      post: postActiveRoomUsers,
      delete: deleteActiveRoomUsers,
    },
  },
  getRoomsOnlineCount,
  getRoomsActiveCount,
};

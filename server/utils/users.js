let online = [];

const addUserOnline = (user) => {
  online.push(user);
  return online;
};

const removeUserOnline = (id) => {
  online = online.filter((u) => u.id !== id);
};

const getOnlineUsers = () => online;

module.exports = {
  addUserOnline,
  removeUserOnline,
  getOnlineUsers,
};

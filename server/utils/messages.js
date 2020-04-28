const formatMessage = (user, text, time = Date.now()) => {
  return { user, text, time };
};

module.exports = {
  formatMessage,
};

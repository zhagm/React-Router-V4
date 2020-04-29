// I've left the connection string for a test mongo cluster but you should plug in your own
// you can get it by following the instructions here: https://docs.mongodb.com/guides/server/drivers/
// This setup should run but it is not secure and you should only enter dummy data
module.exports = {
  MONGODB_URI:
    "mongodb+srv://admin:pass@notsecure-smuei.mongodb.net/test?retryWrites=true&w=majority",
  JWT_SECRET: "json-web-token-secret-goes-here",
};

/* REQUIRES */
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const http = require("http");
const socketInitialize = require("./utils/socket");
require("dotenv").config();

/* APP DECLARATION */
const app = express();
app.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
const server = http.createServer(app);

/* CONNECT SOCKET */
const io = socketInitialize(server);
app.use(function (req, res, next) {
  req.io = io; // pass io object so backend can emit
  next();
});

/* DATABASE */
const db = process.env.MONGODB_URI;
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

/* MIDDLEWARE */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("tiny"));

/* ROUTES */
app.use("/api", require("./routes"));

/* SERVER LISTENING */
const PORT = process.env.PORT || 4000;
server.listen(PORT, (err) => {
  console.log(err || `Server listening on port ${PORT}`);
});

/* next(error) */
app.use((err, req, res) => {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).json(err.message);
});

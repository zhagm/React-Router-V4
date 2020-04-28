/* REQUIRES */
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const http = require("http");
const socketio = require("socket.io");
require("dotenv").config();

/* APP DECLARATION */
const app = express();
const router = express.Router();
const server = http.createServer(app);
const io = socketio(server);

/* SOCKET CONNECTION */
const { formatMessage } = require("./utils/messages")
io.on("connection", (socket) => {
  socket.emit("message", ("chatbot", "A new user has joined the chat"));
  socket.on("message", (msg) => {
    io.emit("message", msg);
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

/* DATABASE */
const db = process.env.MONGODB_URI || require("./config/keys").MONGODB_URI;
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

/* MIDDLEWARE */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("tiny"));

/* ASSIGN SOCKET TO REQ OBJ SO API CAN EMIT */
app.use(function(req, res, next) {
  req.io = io;
  next();
});

/* ROUTES */
app.use("/api", require("./routes"));

/* SERVER LISTENING */
const PORT = process.env.PORT || 4000;
server.listen(PORT, (err) => {
  console.log(err || `Server listening on port ${PORT}`);
});

/* 404 */
app.use((req, res, next) => {
  next();
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

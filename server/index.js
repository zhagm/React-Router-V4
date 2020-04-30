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
const {
  addUserOnline,
  removeUserOnline,
  getOnlineUsers,
} = require("./utils/users");

io.on("connection", (serverSocket) => {
  let user;
  serverSocket.on("login", (userObject) => {
    if (userObject && !user) {
      user = userObject;
      addUserOnline({ name: user.name, id: user._id });
      io.emit("addUserOnline", { name: user.name, id: user._id });
      io.emit(
        "console.log",
        `User ${user.name} is now online, ${io.engine.clientsCount} users online`
      );
    }
  });
  serverSocket.on("userSentMessage", (text) => {
    if (user) {
      io.emit("sendUsersMessage", {
        userId: user._id,
        name: user.name,
        text,
      });
    }
  });
  serverSocket.on("getOnlineUsers", () => {
    let onlineUsers = getOnlineUsers();
    console.log("GETTING ONLINE USERS ", onlineUsers);
    serverSocket.emit("getOnlineUsers", onlineUsers);
  });
  serverSocket.on("removeUserOnline", () => {
    if (user) {
      removeUserOnline(user._id);
      io.emit("removeUserOnline", user._id);
      user = undefined;
    }
  });
  serverSocket.on("disconnect", () => {
    if (user) {
      removeUserOnline(user._id);
      io.emit("removeUserOnline", user._id);
      user = undefined;
    }
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
app.use(function (req, res, next) {
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

const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth.route"));
router.use("/users", require("./users.route"));
router.use("/rooms", require("./rooms.route"));

module.exports = router;

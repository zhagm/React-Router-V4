const express = require("express");
const router = express.Router();

router.use("/temps", require("./temps.route"));
router.use("/users", require("./users.route"));

module.exports = router;

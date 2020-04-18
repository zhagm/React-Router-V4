const express = require("express");
const router = express.Router();

router.use("/items", require("./items.route"));
router.use("/users", require("./users.route"));
router.use("/auth", require("./auth.route"));

module.exports = router;

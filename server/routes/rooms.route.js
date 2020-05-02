const express = require("express");
const router = express.Router();
const auth = require("../utils/authMiddleware");

/* MODELS */
let Room = require("../models/Room"); // note to self - make all routes private

/* ROUTES */ router
  .route("/")
  .post(async (req, res, next) => {
    // PATH: POST /api/rooms/ | DESC: create a new room | PRIVATE
    // accepts req.body = { name: { type: String, required: true }, admins: { type: Array, required: true }, members: { type: Array, required: false } }
    // returns { token: { type: String }, user: { type: Object } }
    let { name, admins, members = [] } = req.body;
    if (!name || !admins)
      return res.status(400).send("Please enter all fields");

    let room = await Room.findOne({ name });
    if (room)
      return res.status(400).send("A room with that name already exists");
    Room.create({ name, admins, members }, (error, room) => {
      if (error) return next(error); // what does next do?
      res.json(room);
    });
  })
  .get((req, res, next) => {
    Room.find((error, rooms) => {
      if (error) return next(error);
      else res.json(rooms);
    });
  });

router
  .route("/:id")
  .get((req, res, next) => {
    Room.findById(req.params.id, (error, room) => {
      if (error) return next(error);
      else res.json(room);
    });
  })
  .put((req, res, next) => {
    Room.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, room) => {
      if (err) return next(err);
      else res.json(room);
    });
  })
  .delete((req, res, next) => {
    Room.findByIdAndRemove(req.params.id, (err, room) => {
      if (err) return next(err);
      else res.json(room);
    });
  });

router
  .route("/:id/members/:memberId")
  .post((req, res, next) => {
    Room.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { members: req.params.memberId } },
      (err, room) => {
        if (err) return next(err);
        else res.json(room);
      }
    );
  })
  .delete((req, res, next) => {
    Room.findByIdAndUpdate(
      req.params.id,
      { $pull: { members: req.params.memberId } },
      (err, room) => {
        if (err) return next(err);
        else res.json(room);
      }
    );
  });

// PATH: GET /api/rooms/:id/members | DESC: get all members in a room | PRIVATE
// accepts req.body = { email: { type: String, required: true }, password: { type: String, required: true } }
// returns { token: { type: String }, user: { type: Object } }
router.route("/:id/members").get((req, res, next) => {
  Room.findById(req.params.id)
    .select("members")
    .populate("members")
    .exec((error, room) => {
      if (error) return next(error);
      res.json(room.members);
    });
});

module.exports = router;

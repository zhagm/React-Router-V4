const express = require("express");
const router = express.Router();
const auth = require("../utils/authMiddleware");

/* MODELS */
let Room = require("../models/Room");

/* ROUTES */ router
  .route("/")
  .post(async (req, res) => {
    // PATH: POST /api/rooms/ | DESC: create a new room | PRIVATE
    // accepts req.body = { name: { type: String, required: true }, admins: { type: Array, required: true }, members: { type: Array, required: false } }
    // returns (room: { type: Object })
    let { name, admins, members = [] } = req.body;
    if (!name || !admins)
      return res.status(400).json("Please enter all fields");

    let room = await Room.findOne({ name });
    if (room)
      return res.status(400).json("A room with that name already exists");
    Room.create({ name, admins, members }, (err, room) => {
      if (err) res.status(400).json("Error creating room");
      else res.status(201).json(room);
    });
  })
  .get((req, res) => {
    // PATH: GET /api/rooms/ | DESC: get all rooms | PRIVATE
    // accepts -
    // returns ([ room: { type: Object } ])
    Room.find((err, rooms) => {
      if (err) res.status(400).json("Error fetching rooms");
      else res.json(rooms);
    });
  });

router
  .route("/:id")
  .get((req, res) => {
    // PATH: GET /api/rooms/:id | DESC: get room by id | PRIVATE
    // accepts req.params.id: { type: String, required: true }
    // returns (room: { type: Object })
    Room.findById(req.params.id, (err, room) => {
      if (err) res.status(404).json("Room not found");
      else res.json(room);
    });
  })
  .put((req, res) => {
    // PATH: PUT /api/rooms/:id | DESC: update room | PRIVATE
    // accepts req.body with any properties that need to be updated in room
    // returns room object before update (room: { type: Object })
    Room.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, room) => {
      if (err) res.status(400).json("Error updating room");
      else res.json(room);
    });
  })
  .delete((req, res) => {
    // PATH: DELETE /api/rooms/:id | DESC: delete room | PRIVATE
    // accepts req.params.id: { type: String, required: true }
    // returns (room: { type: Object })
    Room.findByIdAndRemove(req.params.id, (err, room) => {
      if (err) res.status(400).json("Error deleting room");
      else res.json(room);
    });
  });

router
  .route("/:id/members/:memberId")
  .post((req, res) => {
    // PATH: POST /api/rooms/:id/members/:memberId | DESC: add member to room | PRIVATE
    // accepts req.params = { id: { type: String, required: true }, memberId: { type: String, required: true } }
    // returns room object before update (room: { type: Object })
    Room.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { members: req.params.memberId } }, // addToSet doesn't add duplicates
      (err, room) => {
        if (err) res.status(400).json("Error adding member to room");
        else res.json(room);
      }
    );
  })
  .delete((req, res) => {
    // PATH: DELETE /api/rooms/:id/members/:memberId | DESC: remove member from room | PRIVATE
    // accepts req.params = { id: { type: String, required: true }, memberId: { type: String, required: true } }
    // returns room object before update (room: { type: Object })
    Room.findByIdAndUpdate(
      req.params.id,
      { $pull: { members: req.params.memberId } },
      (err, room) => {
        if (err) res.status(400).json("Error deleting member from room");
        else res.json(room);
      }
    );
  });

router.route("/:id/members").get((req, res) => {
  // PATH: GET /api/rooms/:id/members | DESC: get all members in a room | PRIVATE
  // accepts req.params.id = { type: String, required: true }
  // returns ([ member: { type: Object } ])
  Room.findById(req.params.id)
    .select("members")
    .populate("members")
    .exec((err, room) => {
      if (err) res.status(400).json("Error retrieving room members");
      else res.json(room.members);
    });
});

module.exports = router;

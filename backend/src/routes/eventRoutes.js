const express = require("express");

const router = express.Router();

const {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");

const {
  uploadImage,
} = require("../middleware/multer");

// Create Event
router.post(
  "/",
  uploadImage,
  createEvent
);

// Get Events
router.get("/", getEvents);

// Update Event
router.put(
  "/:id",
  uploadImage,
  updateEvent
);

// Delete Event
router.delete("/:id", deleteEvent);

module.exports = router;
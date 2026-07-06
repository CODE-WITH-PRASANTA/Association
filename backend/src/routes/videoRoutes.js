const express = require("express");

const router = express.Router();

const {
  createVideo,
  getVideos,
  updateVideo,
  deleteVideo,
} = require("../controllers/videoController");

// Create
router.post("/", createVideo);

// Read
router.get("/", getVideos);

// Update
router.put("/:id", updateVideo);

// Delete
router.delete("/:id", deleteVideo);

module.exports = router;
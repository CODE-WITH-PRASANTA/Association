const express = require("express");
const router = express.Router();

const { uploadImage } = require("../middleware/multer");

const {
  createArchive,
  getArchives,
  getArchive,
  updateArchive,
  deleteArchive,
} = require("../controllers/archiveController");

// Create Archive
router.post("/", uploadImage, createArchive);

// Get All Archives
router.get("/", getArchives);

// Get Single Archive
router.get("/:id", getArchive);

// Update Archive
router.put("/:id", uploadImage, updateArchive);

// Delete Archive
router.delete("/:id", deleteArchive);

module.exports = router;
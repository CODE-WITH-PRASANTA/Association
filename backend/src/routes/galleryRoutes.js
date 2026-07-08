const express = require("express");

const router = express.Router();

const {
  uploadGallery,
  getGallery,
  updateGallery,
  deleteGallery,
} = require("../controllers/galleryController");

const { uploadImage } = require("../middleware/multer");

router.get("/", getGallery);

router.post("/upload", uploadImage, uploadGallery);

router.put("/:id", uploadImage, updateGallery);

router.delete("/:id", deleteGallery);

module.exports = router;
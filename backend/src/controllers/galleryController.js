const Gallery = require("../models/Gallery");
const fs = require("fs");
const path = require("path");

// Upload
const uploadGallery = async (req, res) => {
  try {
    const gallery = await Gallery.create({
      image: req.file.filename,
    });

    res.status(201).json({
      success: true,
      gallery,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get
const getGallery = async (req, res) => {
  try {
    const gallery = await Gallery.find().sort({
      createdAt: -1,
    });

    res.json(gallery);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update
const updateGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);

    if (!gallery) {
      return res.status(404).json({
        message: "Image not found",
      });
    }

    // delete old image
    const oldImage = path.join(
      "uploads",
      gallery.image
    );

    if (fs.existsSync(oldImage)) {
      fs.unlinkSync(oldImage);
    }

    gallery.image = req.file.filename;

    await gallery.save();

    res.json({
      success: true,
      gallery,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete
const deleteGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);

    if (!gallery) {
      return res.status(404).json({
        message: "Image not found",
      });
    }

    const imagePath = path.join(
      "uploads",
      gallery.image
    );

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    await Gallery.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  uploadGallery,
  getGallery,
  updateGallery,
  deleteGallery,
};
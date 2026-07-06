const Video = require("../models/Video");

// =======================
// Create Video
// =======================

const createVideo = async (req, res) => {
  try {
    const { youtubeUrl, embedUrl } = req.body;

    if (!youtubeUrl || !embedUrl) {
      return res.status(400).json({
        success: false,
        message: "Video URL is required.",
      });
    }

    const video = await Video.create({
      youtubeUrl,
      embedUrl,
    });

    res.status(201).json({
      success: true,
      video,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================
// Get Videos
// =======================

const getVideos = async (req, res) => {
  try {
    const videos = await Video.find().sort({
      createdAt: -1,
    });

    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================
// Update Video
// =======================

const updateVideo = async (req, res) => {
  try {
    const { youtubeUrl, embedUrl } = req.body;

    const video = await Video.findByIdAndUpdate(
      req.params.id,
      {
        youtubeUrl,
        embedUrl,
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      video,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================
// Delete Video
// =======================

const deleteVideo = async (req, res) => {
  try {
    await Video.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Video Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createVideo,
  getVideos,
  updateVideo,
  deleteVideo,
};
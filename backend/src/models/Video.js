const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    youtubeUrl: {
      type: String,
      required: true,
      trim: true,
    },

    embedUrl: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Video", videoSchema);
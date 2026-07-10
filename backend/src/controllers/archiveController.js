const Archive = require("../models/Archive");


// Create Archive
exports.createArchive = async (req, res) => {
  try {
    const archive = await Archive.create({
      title: req.body.title,
      description: req.body.description,
      notes: req.body.notes || "",
      count: Number(req.body.count) || 0,
      image: req.file ? req.file.path : "",
    });

    res.status(201).json({
      success: true,
      message: "Archive created successfully",
      archive,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Archives
exports.getArchives = async (req, res) => {
  try {
    const archives = await Archive.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      archives,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Archive
exports.getArchive = async (req, res) => {
  try {
    const archive = await Archive.findById(req.params.id);

    if (!archive) {
      return res.status(404).json({
        success: false,
        message: "Archive not found",
      });
    }

    res.status(200).json({
      success: true,
      archive,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Archive
exports.updateArchive = async (req, res) => {
  try {
    const archive = await Archive.findById(req.params.id);

    if (!archive) {
      return res.status(404).json({
        success: false,
        message: "Archive not found",
      });
    }

    if (req.file) {
      if (archive.image) {
        deleteImage(archive.image);
      }

      archive.image = req.file.path;
    }

    archive.title = req.body.title || archive.title;
    archive.description = req.body.description || archive.description;
    archive.notes = req.body.notes || archive.notes;
    archive.count = Number(req.body.count) || archive.count;

    await archive.save();

    res.status(200).json({
      success: true,
      message: "Archive updated successfully",
      archive,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Archive
exports.deleteArchive = async (req, res) => {
  try {
    const archive = await Archive.findById(req.params.id);

    if (!archive) {
      return res.status(404).json({
        success: false,
        message: "Archive not found",
      });
    }

    if (archive.image) {
      deleteImage(archive.image);
    }

    await Archive.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Archive deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
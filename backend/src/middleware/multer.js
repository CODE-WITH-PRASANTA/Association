const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const uploadFolder = "uploads";

if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder, { recursive: true });
}

// Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFolder);
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname)
    );
  },
});

// Upload
const upload = multer({
  storage,
  limits: {
    fileSize: 20 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"), false);
    }
  },
});

// Convert Image to WebP
const uploadImage = [
  upload.single("image"),

  async (req, res, next) => {
    try {
      if (!req.file) return next();

      const inputPath = req.file.path;

      const outputFile = Date.now() + ".webp";

      const outputPath = path.join(uploadFolder, outputFile);

      await sharp(inputPath)
        .webp({
          quality: 80,
        })
        .toFile(outputPath);

      // Delete original file
      fs.unlinkSync(inputPath);

      // Update file object
      req.file.filename = outputFile;
      req.file.path = outputPath;
      req.file.mimetype = "image/webp";

      next();
    } catch (err) {
      next(err);
    }
  },
];

module.exports = {
  uploadImage,
};
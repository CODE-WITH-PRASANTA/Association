const express = require("express");

const router = express.Router();

const {

  createTeam,

  getTeam,

  updateTeam,

  deleteTeam,

} = require("../controllers/teamController");

const {

  uploadImage,

} = require("../middleware/multer");

// Create

router.post(

  "/",

  uploadImage,

  createTeam

);

// Read

router.get(

  "/",

  getTeam

);

// Update

router.put(

  "/:id",

  uploadImage,

  updateTeam

);

// Delete

router.delete(

  "/:id",

  deleteTeam

);

module.exports = router;
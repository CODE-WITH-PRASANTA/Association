const express = require("express");

const router = express.Router();

const {
  createContact,
  getContacts,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");

// Create
router.post("/", createContact);

// Read
router.get("/", getContacts);

// Update
router.put("/:id", updateContact);

// Delete
router.delete("/:id", deleteContact);

module.exports = router;
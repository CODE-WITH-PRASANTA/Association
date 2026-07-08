const Event = require("../models/Event");
const fs = require("fs");
const path = require("path");

// ==========================
// Create Event
// ==========================

const createEvent = async (req, res) => {
  try {
    const { title, category, description } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Event image is required.",
      });
    }

    const event = await Event.create({
      title,
      category,
      description,
      image: req.file.filename,
    });

    res.status(201).json({
      success: true,
      message: "Event Created Successfully",
      event,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ==========================
// Get Events
// ==========================

const getEvents = async (req, res) => {

  try {

    const events = await Event.find().sort({
      createdAt: -1,
    });

    res.status(200).json(events);

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// ==========================
// Update Event
// ==========================

const updateEvent = async (req, res) => {

  try {

    const event = await Event.findById(req.params.id);

    if (!event) {

      return res.status(404).json({
        success: false,
        message: "Event Not Found",
      });

    }

    event.title = req.body.title;
    event.category = req.body.category;
    event.description = req.body.description;

    if (req.file) {

      const oldImage = path.join(
        "uploads",
        event.image
      );

      if (fs.existsSync(oldImage)) {

        fs.unlinkSync(oldImage);

      }

      event.image = req.file.filename;

    }

    await event.save();

    res.status(200).json({
      success: true,
      message: "Event Updated Successfully",
      event,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// ==========================
// Delete Event
// ==========================

const deleteEvent = async (req, res) => {

  try {

    const event = await Event.findById(req.params.id);

    if (!event) {

      return res.status(404).json({
        success: false,
        message: "Event Not Found",
      });

    }

    const imagePath = path.join(
      "uploads",
      event.image
    );

    if (fs.existsSync(imagePath)) {

      fs.unlinkSync(imagePath);

    }

    await Event.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Event Deleted Successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

module.exports = {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent,
};
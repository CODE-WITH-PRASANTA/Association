const Contact = require("../models/Contact");

// ==============================
// Create Contact
// ==============================

const createContact = async (req, res) => {
  try {
    const { name, phone, email, subject, message } = req.body;

    const contact = await Contact.create({
      name,
      phone,
      email,
      subject,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Contact Saved Successfully",
      contact,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ==============================
// Get Contacts
// ==============================

const getContacts = async (req, res) => {

  try {

    const contacts = await Contact.find().sort({
      createdAt: -1,
    });

    res.status(200).json(contacts);

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// ==============================
// Update Contact
// ==============================

const updateContact = async (req, res) => {

  try {

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Updated Successfully",
      contact,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// ==============================
// Delete Contact
// ==============================

const deleteContact = async (req, res) => {

  try {

    await Contact.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Deleted Successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

module.exports = {
  createContact,
  getContacts,
  updateContact,
  deleteContact,
};
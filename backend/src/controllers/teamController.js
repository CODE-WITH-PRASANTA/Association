const Team = require("../models/Team");

const fs = require("fs");

const path = require("path");

// =============================
// Create Team Member
// =============================

const createTeam = async (req, res) => {

  try {

    const {

      name,

      designation,

      regdNo,

      address,

      mobile,

    } = req.body;

    if (!req.file) {

      return res.status(400).json({

        success: false,

        message: "Photo is required",

      });

    }

    const member = await Team.create({

      name,

      designation,

      regdNo,

      address,

      mobile,

      photo: req.file.filename,

    });

    res.status(201).json({

      success: true,

      message: "Team Member Added",

      member,

    });

  }

  catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

// =============================
// Get Team Members
// =============================

const getTeam = async (req, res) => {

  try {

    const members = await Team.find().sort({

      createdAt: -1,

    });

    res.status(200).json(members);

  }

  catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

// =============================
// Update Team Member
// =============================

const updateTeam = async (req, res) => {

  try {

    const member = await Team.findById(req.params.id);

    if (!member) {

      return res.status(404).json({

        success: false,

        message: "Member Not Found",

      });

    }

    member.name = req.body.name;

    member.designation = req.body.designation;

    member.regdNo = req.body.regdNo;

    member.address = req.body.address;

    member.mobile = req.body.mobile;

    if (req.file) {

      const oldImage = path.join(

        "uploads",

        member.photo

      );

      if (fs.existsSync(oldImage)) {

        fs.unlinkSync(oldImage);

      }

      member.photo = req.file.filename;

    }

    await member.save();

    res.status(200).json({

      success: true,

      message: "Updated Successfully",

      member,

    });

  }

  catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

// =============================
// Delete Team Member
// =============================

const deleteTeam = async (req, res) => {

  try {

    const member = await Team.findById(req.params.id);

    if (!member) {

      return res.status(404).json({

        success: false,

        message: "Member Not Found",

      });

    }

    const imagePath = path.join(

      "uploads",

      member.photo

    );

    if (fs.existsSync(imagePath)) {

      fs.unlinkSync(imagePath);

    }

    await Team.findByIdAndDelete(req.params.id);

    res.status(200).json({

      success: true,

      message: "Deleted Successfully",

    });

  }

  catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

module.exports = {

  createTeam,

  getTeam,

  updateTeam,

  deleteTeam,

};
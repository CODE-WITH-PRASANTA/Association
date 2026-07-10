const mongoose = require("mongoose");

const archiveSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        required: true
    },

    notes: {
        type: String,
        default: ""
    },

    count: {
        type: Number,
        default: 0
    },

    image: {
        type: String,
        default: ""
    }

}, {

    timestamps: true

});

module.exports = mongoose.model("Archive", archiveSchema);
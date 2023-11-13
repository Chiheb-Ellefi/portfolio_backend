const mongoose = require("mongoose");

const AboutSchema = new mongoose.Schema({
    description: {
        type: String,
        required: [true, "Provide a description "],
    },
    skills: {
        type: Object,
        required: [true, "Provide a set of skills"],
    },
}, { timestamps: true });

module.exports = mongoose.model("About", AboutSchema);
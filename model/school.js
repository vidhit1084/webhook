const mongoose = require("mongoose");

const schoolSchema = new mongoose.Schema({
  schoolName: String,
});

const School = mongoose.model("School", schoolSchema);

module.exports = School;

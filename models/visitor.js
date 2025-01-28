const mongoose = require("mongoose");

// Define Visitor Schema
const visitorSchema = new mongoose.Schema({
  ipAddress: { type: String, required: true, unique: true },
  visitDate: { type: Date, default: Date.now },
});

// Create Visitor Model
const Visitor = mongoose.model("Visitor", visitorSchema);

module.exports = Visitor;
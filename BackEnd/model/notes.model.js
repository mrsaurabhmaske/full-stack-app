const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: String,
  description: String,
  createdByUsername: String,
  createdByEmail: String,
});

const NoteModel = new mongoose.model("note", noteSchema);

module.exports = { NoteModel };

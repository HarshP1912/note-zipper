const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  note: {
    type: String,
  },
  created_at: {
    type: Date,
    required: true,
  },
  updated_at: {
    type: Date,
  },
});

const Note = mongoose.model("Note", notesSchema);

module.exports = Note;

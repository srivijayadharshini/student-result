const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  rollNumber: {
    type: String,
    required: true,
    unique: true,
  },

  department: {
    type: String,
    required: true,
  },

  marks: {
    math: {
      type: Number,
      required: true,
    },

    science: {
      type: Number,
      required: true,
    },

    english: {
      type: Number,
      required: true,
    },
  },

  percentage: {
    type: Number,
  },

  grade: {
    type: String,
  },
});

module.exports = mongoose.model('Student', studentSchema);
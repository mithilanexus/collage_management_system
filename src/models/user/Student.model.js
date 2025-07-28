import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: false,
  },
  program: {
    type: String,
    required: false,
  },
  currentGPA: {
    type: Number,
    required: false,
  },
  year: {
    type: Number,
    required: false,
  },
  class: {
    type: String,
    required: false,
  },
  section: {
    type: String,
    required: false,
  },
  rollNumber: {
    type: Number,
    required: false,
  },
  totalCredits: {
    type: Number,
    required: false,
  },
  remainingCredits: {
    type: Number,
    required: false,
  },
  semester: {
    type: Number,
    required: false,
  },
});

import mongoose,{Schema } from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    studentKey: {
      type: String,
      required: true,
      unique: true,
    }, 
    parent: {
      type: Schema.Types.ObjectId,
      ref: "Parent",
    },
    name: {
      type: String,
      required: true,
    },
    class: {
      type: String,
      required: true,
    },
    section: {
      type: String,
      required: true,
    },
    rollNumber: {
      type: String,
      required: true,
    },
    admissionDate: {
      type: Date,
      required: false,
      default: Date.now(),
    },
    status: {
      type: String,
      required: true,
      enum: ["Active", "Inactive", "Graduated", "Withdrawn"],
      default: "Active",
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    bloodGroup: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: true,
    },
    previousSchool: {
      type: String,
      required: false,
    },
    slcGpa: {
      type: String,
      required: false,
    },
    hostelResident: {
      type: Boolean,
      default: false,
    },
    transportUser: {
      type: Boolean,
      default: false,
    },
    scholarshipHolder: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Student ||
  mongoose.model("Student", studentSchema);

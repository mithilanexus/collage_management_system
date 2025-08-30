import mongoose, { Schema } from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      required: true,
      unique: true,
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
      required: true,
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
    fatherName: {
      type: String,
      required: false,
    },
    fatherOccupation: {
      type: String,
      required: false,
    },
    fatherPhone: {
      type: String,
      required: false,
    },
    motherName: {
      type: String,
      required: false,
    },
    motherOccupation: {
      type: String,
      required: false,
    },
    guardianName: {
      type: String,
      required: false,
    },
    guardianRelation: {
      type: String,
      required: false,
    },
    guardianPhone: {
      type: String,
      required: false,
    },
    nationality: {
      type: String,
      default: "Nepali",
    },
    caste: {
      type: String,
      required: false,
    },
    religion: {
      type: String,
      required: false,
    },
    permanentAddress: {
      type: String,
      required: false,
    },
    temporaryAddress: {
      type: String,
      required: false,
    },
    district: {
      type: String,
      required: false,
    },
    province: {
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
    medicalConditions: {
      type: String,
      required: false,
    },
    emergencyContact: {
      type: String,
      required: false,
    },
    emergencyContactRelation: {
      type: String,
      required: false,
    },
    remarks: {
      type: String,
      required: false,
    },
    gender: {
      type: String,
      required: false,
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: "Parent",
    },
    previousSchool: {
      type: String,
      required: false,
    },
    slcGpa: {
      type: Number,
      required: false,
    },
    
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Student ||
  mongoose.model("Student", studentSchema);

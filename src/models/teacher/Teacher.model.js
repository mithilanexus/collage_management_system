import mongoose, { Schema } from "mongoose";

const teacherSchema = new Schema(
  {
    // Basic Information
    name: {
      type: String,
      required: true,
    },
    employeeId: {
      type: String,
      required: true,
      unique: true,
    },
    designation: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    qualification: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },

    // Contact Information
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    province: {
      type: String,
      required: true,
    },

    // Professional Information
    joiningDate: {
      type: Date,
      required: true,
    },
    salary: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["Permanent", "Temporary", "Contract"],
      default: "Temporary",
    },
    subjects: {
      type: [String],
      required: true,
    },

    // Personal Information
    dateOfBirth: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Other"],
    },
    bloodGroup: {
      type: String,
      required: false,
    },
    maritalStatus: {
      type: String,
      required: true,
      enum: ["Single", "Married", "Divorced", "Widowed"],
    },
    citizenship: {
      type: String,
      required: true,
    },
    panNumber: {
      type: String,
      required: true,
      unique: true,
    },

    // Additional Information
    emergencyContact: {
      type: String,
      required: true,
    },
    emergencyContactRelation: {
      type: String,
      required: true,
    },
    bankAccount: {
      type: String,
      required: true,
    },
    bankName: {
      type: String,
      required: true,
    },
    remarks: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const teacherModel =
  mongoose.models.Teacher || mongoose.model("Teacher", teacherSchema);

export default teacherModel;

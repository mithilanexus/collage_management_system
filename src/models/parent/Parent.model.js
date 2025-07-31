import mongoose, { Schema } from "mongoose";

const parentSchema = new Schema(
  {
    // Father's Information
    fatherName: {
      type: String,
      required: true,
    },
    fatherOccupation: {
      type: String,
      required: false,
    },
    fatherEducation: {
      type: String,
      required: false,
    },
    fatherPhone: {
      type: String,
      required: false,
    },

    // Mother's Information
    motherName: {
      type: String,
      required: true,
    },
    motherOccupation: {
      type: String,
      required: false,
    },
    motherEducation: {
      type: String,
      required: false,
    },
    motherPhone: {
      type: String,
      required: false,
    },

    // Guardian Information
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
    guardianOccupation: {
      type: String,
      required: false,
    },

    // Contact Information
    primaryPhone: {
      type: String,
      required: true,
    },
    alternatePhone: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },

    // Address Information
    permanentAddress: {
      type: String,
      required: true,
    },
    temporaryAddress: {
      type: String,
      required: false,
    },
    district: {
      type: String,
      required: true,
    },
    province: {
      type: String,
      required: true,
    },
    ward: {
      type: String,
      required: false,
    },

    // Legal Information
    citizenshipNumber: {
      type: String,
      required: true,
    },
    citizenshipIssueDate: {
      type: Date,
      required: false,
    },
    citizenshipIssueDistrict: {
      type: String,
      required: false,
    },

    // Financial Information
    annualIncome: {
      type: String,
      required: false,
    },
    occupation: {
      type: String,
      required: false,
    },

    // Additional Information
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
    parentKey: {
      type: String,
      required: true,
    },
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
    studentsCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const parentModel =
  mongoose.models.Parent || mongoose.model("Parent", parentSchema);

export default parentModel;

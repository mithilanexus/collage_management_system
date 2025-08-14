import mongoose, { Schema } from "mongoose";

const primaryLevelTeacherSchema = new Schema(
    {
        // Personal Information 
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        address: { type: String, required: true },
        dateOfBirth: { type: Date, required: true },
        gender: { type: String, required: true },
        citizenshipNumber: { type: String },

        // Professional Information
        qualification: { type: String, required: true },
        experience: { type: String },
        previousSchool: { type: String },
        joinDate: { type: Date, required: true },
        employeeId: { type: String, required: true },

        // Teaching Details
        // subjects: [{ type: Schema.Types.ObjectId, ref: "PrimarySubject" }],
        subjects: [],
        // classes: [{ type: Schema.Types.ObjectId, ref: "PrimaryClass" }],
        classes: [],

        // Salary Information
        basicSalary: { type: Number, required: true },
        allowances: { type: Number },

        // Additional Information
        emergencyContact: { type: String },
        emergencyPhone: { type: String },
        notes: { type: String },
    },
    { timestamps: true }
);

const PrimaryLevelTeacherModel = mongoose.models.PrimaryLevelTeacher || mongoose.model("PrimaryLevelTeacher", primaryLevelTeacherSchema);

export default PrimaryLevelTeacherModel;

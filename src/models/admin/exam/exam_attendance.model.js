import mongoose, { Schema } from "mongoose";

const examAttendanceSchema = new Schema(
    {
        studentId: {
            type: Schema.Types.ObjectId,
            ref: "Student",
            required: true,
        },
        examId: {
            type: Schema.Types.ObjectId,
            ref: "ExamSchedule",
            required: true,
        },
        examName: {
            type: String,
            required: true,
        },
        studentName: {
            type: String,
            required: true,
        },
        rollNumber: {
            type: String,
            required: true,
        },
        class: {
            type: String,
            required: true,
        },
        section: {
            type: String,
            default: "A",
        },
        examDate: {
            type: Date,
            required: true,
        },
        subject: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["present", "absent", "late", "excused"],
            required: true,
        },
        timeIn: {
            type: String, // Format: "HH:MM"
        },
        timeOut: {
            type: String, // Format: "HH:MM"
        },
        remarks: {
            type: String,
            default: "",
        },
        markedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        markedAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

// Indexes for better query performance
examAttendanceSchema.index({ studentId: 1, examId: 1, examDate: 1, subject: 1 }, { unique: true });
examAttendanceSchema.index({ examId: 1 });
examAttendanceSchema.index({ examDate: 1 });
examAttendanceSchema.index({ class: 1 });
examAttendanceSchema.index({ status: 1 });

const ExamAttendanceModel = mongoose.models.ExamAttendance || mongoose.model("ExamAttendance", examAttendanceSchema);
export default ExamAttendanceModel;

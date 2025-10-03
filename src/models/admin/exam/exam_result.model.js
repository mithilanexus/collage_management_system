import mongoose, { Schema } from "mongoose";

const examResultSchema = new Schema(
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
        subjects: [
            {
                name: {
                    type: String,
                    required: true,
                },
                marksObtained: {
                    type: Number,
                    required: true,
                    min: 0,
                },
                totalMarks: {
                    type: Number,
                    required: true,
                    min: 1,
                },
                grade: {
                    type: String,
                    enum: ["A+", "A", "B+", "B", "C", "D", "F"],
                    required: true,
                },
            }
        ],
        totalMarks: {
            type: Number,
            required: true,
        },
        obtainedMarks: {
            type: Number,
            required: true,
        },
        percentage: {
            type: Number,
            required: true,
            min: 0,
            max: 100,
        },
        grade: {
            type: String,
            enum: ["A+", "A", "B+", "B", "C", "D", "F"],
            required: true,
        },
        status: {
            type: String,
            enum: ["draft", "published", "reviewed"],
            default: "draft",
        },
        remarks: {
            type: String,
            default: "",
        },
        publishedAt: {
            type: Date,
        },
        reviewedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

// Indexes for better query performance
examResultSchema.index({ studentId: 1, examId: 1 }, { unique: true });
examResultSchema.index({ examId: 1 });
examResultSchema.index({ class: 1 });
examResultSchema.index({ status: 1 });

const ExamResultModel = mongoose.models.ExamResult || mongoose.model("ExamResult", examResultSchema);
export default ExamResultModel;

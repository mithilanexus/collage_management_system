import mongoose, { Schema } from "mongoose";

const examScheduleSchema = new Schema(
    {
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        examLevel: {
            type: String,
            required: true,
            enum: ["primary", "secondary", "bachelor"],
        },
        examName: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            default: "",
        },
        venue: {
            type: String,
            default: "Main Campus",
        },
        examType: {
            type: String,
            enum: ["Terminal", "Annual", "Pre-Board", "Unit Test"],
            default: "Terminal",
        },
        priority: {
            type: String,
            enum: ["high", "medium", "low"],
            default: "medium",
        },
        status: {
            type: String,
            enum: ["upcoming", "ongoing", "completed"],
            default: "upcoming",
        },
        dates: [
            {
                type: Date,
            }
        ],
        schedule: [
            {
                className: {
                    type: String,
                    required: true,
                },
                subjects: [
                    {
                        type: String,
                        required: true,
                    }
                ],
                studentsCount: {
                    type: Number,
                    default: 0,
                },
                totalSubjects: {
                    type: Number,
                    default: 0,
                },
            }
        ],
        totalDays: {
            type: Number,
            default: function() {
                if (this.startDate && this.endDate) {
                    const diffTime = Math.abs(this.endDate - this.startDate);
                    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
                }
                return 0;
            }
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

// Add indexes for better performance
examScheduleSchema.index({ examLevel: 1, examName: 1 }, { unique: true });
examScheduleSchema.index({ status: 1 });
examScheduleSchema.index({ startDate: 1 });
examScheduleSchema.index({ examLevel: 1 });

const ExamScheduleModel = mongoose.models.ExamSchedule || mongoose.model("ExamSchedule", examScheduleSchema);
export default ExamScheduleModel;

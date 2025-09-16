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
        },
        examName: {
            type: String,
            required: true,
        },
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
            }
        ],
    },
    { timestamps: true }
);

const ExamScheduleModel = mongoose.models.ExamSchedule || mongoose.model("ExamSchedule", examScheduleSchema);
export default ExamScheduleModel;

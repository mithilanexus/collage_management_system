
import mongoose from "mongoose";

const timeSlotSchema = new mongoose.Schema({
    periodNumber: { type: Number, required: true },
    start: { type: String, required: true }, // "10:00"
    end: { type: String, required: true },   // "10:45"
});

const scheduleSchema = new mongoose.Schema({
    day: {
        type: String,
        enum: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        required: true,
    },
    subjects: [
        {
            periodNumber: { type: Number, required: true }, 
            subjectName: { type: String, default: "" },   
            subjectId: { type: String, default: "" },   
            teacherId: { type: String },                
            teacherName: { type: String, default: "" },
        },
    ],
});

const primaryClassScheduleSchema = new mongoose.Schema(
    {
        classGrade: { type: String, required: true }, 
        classId: { type: String, required: true },
        timeSlots: [timeSlotSchema],                
        schedule: [scheduleSchema],                 
    },
    { timestamps: true }
);
const PrimaryClassScheduleModel = mongoose.models.PrimaryClassSchedule || mongoose.model("PrimaryClassSchedule", primaryClassScheduleSchema);
export default PrimaryClassScheduleModel
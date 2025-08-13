import mongoose, { Schema } from "mongoose";
const primaryClassSchema = new Schema(
  {
    grade: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: false,
    },
    ageGroup: {
      type: String,
      required: false,
    },
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: "Student",
        default: [],
      },
    ],
    teachers: [
      {
        type: Schema.Types.ObjectId,
        ref: "Teacher",
      },
    ],
    classTeacher: {
      type: Schema.Types.ObjectId,
      ref: "Teacher",
    },
    sections: {
      type: Number,
      default: 1,
    },
    weeklyHours: {
      type: Number,
      default: 30,
    },
    description: {
      type: String,
    },
    subjects: [
      {
        type: Schema.Types.ObjectId,
        ref: "PrimarySubject",
      },
    ],
  },
  { timestamps: true }
);

const PrimaryClassModel =
  mongoose.models.PrimaryClass ||
  mongoose.model("PrimaryClass", primaryClassSchema);
export default PrimaryClassModel;

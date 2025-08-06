import mongoose, { Schema } from "mongoose";
const primaryClassSchema = new Schema(
  {
    grade: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    ageGroup: {
      type: String,
      required: true,
    },
    students: {
      type: Number,
      default: 0,
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
        ref: "Subject",
      },
    ],
  },
  { timestamps: true }
);

const PrimaryClassModel =
  mongoose.models.PrimaryClass ||
  mongoose.model("PrimaryClass", primaryClassSchema);
export default PrimaryClassModel;

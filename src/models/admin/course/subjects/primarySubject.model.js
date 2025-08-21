import mongoose, { Schema } from "mongoose";

const primarySubjectSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    code: {
      type: String,
      required: true,
      unique: true
    },
    type: {
      type: String,
      required: true
    },
    mandatory: {
      type: Boolean,
      required: true,
      default: false
    },
    description: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true,
      default: 'active'
    },
    objectives: [String],
    subjectLevel: {
      type: String,
      default: "primary"
    },
    assignedClasses: [
      {
        teacher: {
          type: String,
        },
        teacherId: String,
        classId: String,
        classGrade: String,
      }
    ]
  },
  { timestamps: true }
);

// Check if the model is already defined
let PrimarySubjectModel;

if (mongoose.models.PrimarySubject) {
  PrimarySubjectModel = mongoose.models.PrimarySubject;
} else {
  PrimarySubjectModel = mongoose.model("PrimarySubject", primarySubjectSchema);
}

export default PrimarySubjectModel;

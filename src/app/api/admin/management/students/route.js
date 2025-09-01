import StudentModel from "@/models/admin/management/student/Student.model";
import parentModel from "@/models/parent/Parent.model";
import { generateStudentId } from "@/utils/getUinqueId";

export async function GET() {
  try {
    const students = await StudentModel.find({}).lean();
    return Response.json({
      message: "Students data retrieved successfully",
      success: true,
      data: students,
    });
  } catch (error) {
    return Response.json({
      message: "Failed to retrieve students data",
      success: false,
      data: [],
      error: error.message, // 💡 better to return just the message
    });
  }
}

export async function POST(request) {
  const req = await request.json();
  try {
    req.name = `${req.firstName} ${req.lastName}`;
    const studentId = generateStudentId(req.name, req.rollNumber) || `STU${Date.now()}`;
    console.log(studentId)
    req.studentId = studentId;
    req.parentId = req.parentId || null;
    const student = await StudentModel.findOne({ studentId });
    if (student) {
      return Response.json({
        message: "Student with this ID already exists",
        success: false,
      }, { status: 400 });
    }
    const newStudent = await StudentModel.create(req);
    if (req.parentId) {
      await parentModel.findOneAndUpdate(
        { _id: req.parentId },
        { $addToSet: { students: newStudent._id } },
        { new: true }
      );
    }
    const res = {
      message: "Student added successfully",
      success: true,
      data: newStudent,
    };
    return Response.json({ ...res });
  } catch (error) {
    const res = {
      message: "Failed to add student",
      success: false,
      error: error.message,
    };
    return Response.json({ ...res });
  }
}

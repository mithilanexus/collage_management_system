import StudentModel from "@/models/admin/management/student/Student.model";
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
  console.log(req);
  try {
    const studentId = generateStudentId(req.firstName, req.class, req.rollNumber) || `STU${Date.now()}`;
    req.name = `${req.firstName} ${req.lastName}`;
    req.address = req.permanentAddress;
    req.studentKey = studentId;
    req.parentId = "Unassigned";
    const newStudent = await StudentModel.create(req);
    return Response.json({
      message: "Student added successfully",
      success: true,
      data: newStudent,
    });
  } catch (error) {
    return Response.json({
      message: "Failed to add student",
      success: false,
      error: error.message,
    });
  }
}

 
import parentModel from "@/models/parent/Parent.model";
import StudentModel from "@/models/admin/management/student/Student.model";
import { generateStudentId } from "@/utils/getUinqueId";

export async function POST(request, { params }) {
  const req = await request.json();
  const studentId = generateStudentId(req.name, req.class, req.rollNumber);
  try {
    const parentId = await params.id;
    req.parent = parentId;
    req.studentKey = studentId;
    const newStudent = await StudentModel.create(req);
    const parent = await parentModel.findOneAndUpdate(
      {
        _id: parentId,
      },
      {
        $push: {
          students: newStudent._id,
        },
        $inc: {
          studentsCount: 1,
        },
      },
      { new: true }
    );
    return Response.json({
      message: "Students added to parent successfully",
      success: true,
      data: newStudent,
    });
  } catch (error) {
    return Response.json({
      message: "Failed to add students to parent",
      success: false,
      error: error.message,
    });
  }
}

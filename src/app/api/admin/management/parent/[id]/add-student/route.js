
import parentModel from "@/models/parent/Parent.model";
import StudentModel from "@/models/admin/management/student/Student.model";
import { generateStudentId } from "@/utils/getUinqueId";

export async function POST(request, { params }) {
  const req = await request.json();
  try {
    const parentId = await params.id;
    console.log(req);

    const parent = await parentModel.findOneAndUpdate(
      {
        _id: parentId,
      },
      {
        $addToSet: {
          students: { $each: req },
        },
      },
      { new: true }
    );

    for (const studentId of req) {
      await StudentModel.updateOne(
        { _id: studentId },
        { $set: { parentId: parentId } } // replaces, not pushes
      );
    }



    return Response.json({
      message: "Students added to parent successfully",
      success: true,
      data: parent,
    });
  } catch (error) {
    return Response.json({
      message: "Failed to add students to parent",
      success: false,
      error: error.message,
    });
  }
}

import teacherModel from "@/models/teacher/Teacher.model";

export async function GET(request, { params }) {
  try {
    const teacherId = await params.id;
    const teacher = await teacherModel.findOne({ _id: teacherId }).lean();
    return Response.json({
      message: "Teacher data retrieved successfully",
      success: true,
      data: teacher,
    });
  } catch (error) {
    return Response.json({
      message: "Failed to retrieve teacher data",
      success: false,
      error: error.message,
    });
  }
}

export async function PUT(request, { params }) {
  const req = await request.json();
  try {
    const teacherId = await params.id;
    const teacher = await teacherModel.findOneAndUpdate(
      {
        _id: teacherId,
      },
      req,
      { new: true }
    );
    return Response.json({
      message: "Teacher updated successfully",
      success: true,
      data: teacher,
    });
  } catch (error) {
    return Response.json({
      message: "Failed to update teacher",
      success: false,
      error,
    });
  }
}

export async function DELETE(request, { params }) {
  try {
    const teacherId = await params.id;
    await teacherModel.findOneAndDelete({
      _id: teacherId,
    });
    return Response.json({
      message: "Teacher deleted successfully",
      success: true,
    });
  } catch (error) {
    return Response.json({
      message: "Failed to delete teacher",
      success: false,
      error,
    });
  }
}

import teacherModel from "@/models/teacher/Teacher.model";

export async function GET() {
  try {
    const teachers = await teacherModel.find({}).lean();
    return Response.json({
      message: "Teachers data retrieved successfully",
      success: true,
      data: teachers,
    });
  } catch (error) {
    return Response.json({
      message: "Failed to retrieve teachers data",
      success: false,
      error,
    });
  }
}

export async function POST(request) {
  const req = await request.json();
  try {
    const newTeacher = await teacherModel.create(req);
    return Response.json({
      message: "Teacher added successfully",
      success: true,
      data: newTeacher,
    });
  } catch (error) {
    return Response.json({
      message: "Failed to add teacher",
      success: false,
      error,
    });
  }
}

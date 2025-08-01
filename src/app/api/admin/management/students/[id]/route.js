import StudentModel from "@/models/student/Student.model";

export async function GET(request, { params }) {
  try {
    const studentId = params.id;
    const student = await StudentModel.findOne({ _id: studentId }).lean();

    if (!student) {
      return Response.json({
        message: "Student not found",
        success: false,
      }, { status: 404 });
    }

    return Response.json({
      message: "Student data retrieved successfully",
      success: true,
      data: student,
    });
  } catch (error) {
    return Response.json({
      message: "Failed to retrieve student data",
      success: false,
      error: error.message,
    }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const req = await request.json();
    const studentId = params.id;

    const student = await StudentModel.findOneAndUpdate(
      { _id: studentId },
      req,
      { new: true }
    );

    if (!student) {
      return Response.json({
        message: "Student not found",
        success: false,
      }, { status: 404 });
    }

    return Response.json({
      message: "Student updated successfully",
      success: true,
      data: student,
    });
  } catch (error) {
    return Response.json({
      message: "Failed to update student",
      success: false,
      error: error.message,
    }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const studentId = params.id;
    const student = await StudentModel.findOneAndDelete({
      _id: studentId,
    });

    if (!student) {
      return Response.json({
        message: "Student not found",
        success: false,
      }, { status: 404 });
    }

    return Response.json({
      message: "Student deleted successfully",
      success: true,
    });
  } catch (error) {
    return Response.json({
      message: "Failed to delete student",
      success: false,
      error: error.message,
    }, { status: 500 });
  }
}

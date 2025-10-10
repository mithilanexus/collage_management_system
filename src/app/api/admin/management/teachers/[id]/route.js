import teacherModel from "@/models/teacher/Teacher.model";
import connectDB from "@/lib/coonectDb";
import { ok, notFound, serverError, created } from "@/lib/apiResponse";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const teacherId = params.id;
    const teacher = await teacherModel.findById(teacherId).lean();
    if (!teacher) return notFound("Teacher not found");
    return ok(teacher, "Teacher data retrieved successfully");
  } catch (error) {
    return serverError("Failed to retrieve teacher data", error.message);
  }
}

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const req = await request.json();
    const teacherId = params.id;
    const teacher = await teacherModel.findOneAndUpdate({ _id: teacherId }, req, { new: true }).lean();
    if (!teacher) return notFound("Teacher not found");
    return ok(teacher, "Teacher updated successfully");
  } catch (error) {
    return serverError("Failed to update teacher", error.message);
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const teacherId = params.id;
    const deleted = await teacherModel.findOneAndDelete({ _id: teacherId }).lean();
    if (!deleted) return notFound("Teacher not found");
    return ok(null, "Teacher deleted successfully");
  } catch (error) {
    return serverError("Failed to delete teacher", error.message);
  }
}

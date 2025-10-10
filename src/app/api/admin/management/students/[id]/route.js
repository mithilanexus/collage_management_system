import StudentModel from "@/models/admin/management/student/Student.model";
import connectDB from "@/lib/coonectDb";
import { ok, notFound, serverError } from "@/lib/apiResponse";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const studentId = params.id;
    const student = await StudentModel.findById(studentId).lean();
    if (!student) return notFound("Student not found");
    return ok(student, "Student data retrieved successfully");
  } catch (error) {
    return serverError("Failed to retrieve student data", error.message);
  }
}

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const req = await request.json();
    const studentId = params.id;
    req.name = `${req.firstName} ${req.lastName}`;
    const student = await StudentModel.findOneAndUpdate({ _id: studentId }, req, { new: true }).lean();
    if (!student) return notFound("Student not found");
    return ok(student, "Student updated successfully");
  } catch (error) {
    return serverError("Failed to update student", error.message);
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const studentId = params.id;
    const student = await StudentModel.findOneAndDelete({ _id: studentId }).lean();
    if (!student) return notFound("Student not found");
    return ok(null, "Student deleted successfully");
  } catch (error) {
    return serverError("Failed to delete student", error.message);
  }
}

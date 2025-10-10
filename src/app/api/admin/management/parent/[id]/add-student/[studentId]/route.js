import StudentModel from "@/models/admin/management/student/Student.model";
import parentModel from "@/models/parent/Parent.model";
import connectDB from "@/lib/coonectDb";
import { ok, notFound, serverError } from "@/lib/apiResponse";

export async function POST(request, { params }) {
  try {
    await connectDB();
    const parentId = params.id;
    const studentId = params.studentId;
    const parent = await parentModel.findOneAndUpdate(
      { _id: parentId },
      { $push: { students: studentId }, $inc: { studentsCount: 1 } },
      { new: true }
    ).lean();
    if (!parent) return notFound("Parent not found");
    await StudentModel.updateOne({ _id: studentId }, { $set: { parentId } });
    return ok(parent, "Students added to parent successfully");
  } catch (error) {
    return serverError("Failed to add students to parent", error.message);
  }
}
export async function PUT(request, { params }) {
  try {
    await connectDB();
    const req = await request.json();
    const studentId = params.studentId;
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
    const parentId = params.id;
    const studentId = params.studentId;
    const parent = await parentModel.findOneAndUpdate(
      { _id: parentId },
      { $pull: { students: studentId }, $inc: { studentsCount: -1 } },
      { new: true }
    ).lean();
    if (!parent) return notFound("Parent not found");
    const student = await StudentModel.findOneAndUpdate(
      { _id: studentId },
      { $set: { parentId: null } },
      { new: true }
    ).lean();
    if (!student) return notFound("Student not found");
    return ok({ parent, student }, "Students removed from parent successfully");
  } catch (error) {
    return serverError("Failed to remove students from parent", error.message);
  }
}

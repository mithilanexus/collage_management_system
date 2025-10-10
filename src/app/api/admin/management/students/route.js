import StudentModel from "@/models/admin/management/student/Student.model";
import parentModel from "@/models/parent/Parent.model";
import { generateStudentId } from "@/utils/getUinqueId";
import connectDB from "@/lib/coonectDb";
import { ok, created, serverError, badRequest, conflict } from "@/lib/apiResponse";
import { StudentCreateSchema } from "@/lib/validation/admin";

export async function GET() {
  try {
    await connectDB();
    const students = await StudentModel.find({}).lean();
    return ok(students, "Students data retrieved successfully");
  } catch (error) {
    return serverError("Failed to retrieve students data", error.message);
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const parsed = StudentCreateSchema.safeParse(body);
    if (!parsed.success) {
      return badRequest("Validation failed", parsed.error.flatten());
    }
    const req = parsed.data;
    req.name = `${req.firstName} ${req.lastName}`;
    const studentId = generateStudentId(req.name, req.rollNumber) || `STU${Date.now()}`;
    req.studentId = studentId;
    req.parentId = req.parentId || null;

    const existingById = await StudentModel.findOne({ studentId });
    if (existingById) {
      return conflict("Student with this ID already exists");
    }
    // Also avoid duplicate email (unique)
    const existingByEmail = await StudentModel.findOne({ email: req.email });
    if (existingByEmail) {
      return conflict("Student with this email already exists");
    }

    const newStudent = await StudentModel.create(req);
    if (req.parentId) {
      await parentModel.findOneAndUpdate(
        { _id: req.parentId },
        { $addToSet: { students: newStudent._id } },
        { new: true }
      );
    }
    return created(newStudent, "Student added successfully");
  } catch (error) {
    return serverError("Failed to add student", error.message);
  }
}

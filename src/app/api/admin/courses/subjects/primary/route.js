import PrimarySubjectModel from "@/models/admin/course/subjects/primarySubject.model";
import connectDB from "@/lib/coonectDb";
import { ok, created, serverError, badRequest, conflict } from "@/lib/apiResponse";
import { PrimarySubjectSchema } from "@/lib/validation/admin";

export async function GET() {
  try {
    await connectDB();
    const subjects = await PrimarySubjectModel.find({});
    return ok(subjects, "Subjects retrieved successfully");
  } catch (error) {
    return serverError("Failed to retrieve subjects", error.message);
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const parsed = PrimarySubjectSchema.safeParse({ ...body, subjectLevel: "primary" });
    if (!parsed.success) {
      return badRequest("Validation failed", parsed.error.flatten());
    }
    const payload = parsed.data;
    try {
      const newSubject = await PrimarySubjectModel.create(payload);
      return created(newSubject, "Subject added successfully");
    } catch (err) {
      if (err?.code === 11000) {
        return conflict("Subject with the same code already exists", err.message);
      }
      throw err;
    }
  } catch (error) {
    return serverError("Failed to add subject", error.message);
  }
}
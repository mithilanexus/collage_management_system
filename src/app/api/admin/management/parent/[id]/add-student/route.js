import parentModel from "@/models/parent/Parent.model";
import StudentModel from "@/models/admin/management/student/Student.model";
import connectDB from "@/lib/coonectDb";
import { ok, badRequest, notFound, serverError } from "@/lib/apiResponse";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const parentId = params.id;
    const url = new URL(request.url);
    const search = url.searchParams.get("search") || "";

    // find students not yet linked to a parent (available to add)
    const filter = {
      $and: [
        { $or: [{ parentId: { $exists: false } }, { parentId: null }] },
        search
          ? {
              $or: [
                { name: { $regex: search, $options: "i" } },
                { studentId: { $regex: search, $options: "i" } },
                { class: { $regex: search, $options: "i" } },
              ],
            }
          : {},
      ],
    };

    const students = await StudentModel.find(filter).lean();
    return ok(students, "Students data retrieved successfully");
  } catch (error) {
    return serverError("Failed to retrieve students data", error.message);
  }
}

export async function POST(request, { params }) {
  try {
    await connectDB();
    const body = await request.json();
    const parentId = params.id;

    if (!Array.isArray(body) || body.length === 0) {
      return badRequest("Request body must be a non-empty array of student IDs");
    }

    const parent = await parentModel.findById(parentId).lean();
    if (!parent) return notFound("Parent not found");

    const updateParent = await parentModel.findOneAndUpdate(
      { _id: parentId },
      { $addToSet: { students: { $each: body } }, $inc: { studentsCount: body.length } },
      { new: true }
    ).lean();

    // Update each student's parentId
    await StudentModel.updateMany(
      { _id: { $in: body } },
      { $set: { parentId } }
    );

    return ok(updateParent, "Students added to parent successfully");
  } catch (error) {
    return serverError("Failed to add students to parent", error.message);
  }
}

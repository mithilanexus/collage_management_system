import teacherModel from "@/models/teacher/Teacher.model";
import connectDB from "@/lib/coonectDb";
import { ok, created, serverError } from "@/lib/apiResponse";
import { parsePageParams, paginateQuery } from "@/lib/pagination";

export async function GET(request) {
  try {
    await connectDB();
    const { page, pageSize, search } = parsePageParams(request);
    const filter = {};
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { subject: { $regex: search, $options: "i" } },
      ];
    }
    const baseQuery = teacherModel.find(filter).sort({ createdAt: -1 }).lean();
    const { data, total } = await paginateQuery(baseQuery, page, pageSize);
    return ok({ items: data, total, page, pageSize }, "Teachers data retrieved successfully");
  } catch (error) {
    return serverError("Failed to retrieve teachers data", error.message);
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const req = await request.json();
    const newTeacher = await teacherModel.create(req);
    return created(newTeacher, "Teacher added successfully");
  } catch (error) {
    return serverError("Failed to add teacher", error.message);
  }
}

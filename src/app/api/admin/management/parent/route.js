import parentModel from "@/models/parent/Parent.model";
import { generateParentId } from "@/utils/getUinqueId";
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
        { fatherName: { $regex: search, $options: "i" } },
        { motherName: { $regex: search, $options: "i" } },
        { fatherPhone: { $regex: search, $options: "i" } },
        { motherPhone: { $regex: search, $options: "i" } },
      ];
    }
    const baseQuery = parentModel.find(filter).sort({ createdAt: -1 }).lean();
    const { data, total } = await paginateQuery(baseQuery, page, pageSize);
    return ok({ items: data, total, page, pageSize }, "Parents data retrieved successfully");
  } catch (error) {
    return serverError("Failed to retrieve parents data", error.message);
  }
}
export async function POST(request) {
  try {
    await connectDB();
    const req = await request.json();
    const parentId = generateParentId(
      req.fatherName,
      req.fatherPhone,
      req.citizenshipNumber || req.motherPhone
    );
    req.parentKey = parentId;
    req.students = [];
    req.studentsCount = 0;
    const newParent = await parentModel.create(req);
    return created(newParent, "Parent added successfully");
  } catch (error) {
    return serverError("Parent added failed", error.message);
  }
}

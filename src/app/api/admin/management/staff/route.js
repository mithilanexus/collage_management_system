import staffModel from "@/models/staff/Staff.model";
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
        { department: { $regex: search, $options: "i" } },
      ];
    }
    const baseQuery = staffModel.find(filter).sort({ createdAt: -1 }).lean();
    const { data, total } = await paginateQuery(baseQuery, page, pageSize);
    return ok({ items: data, total, page, pageSize }, "Staff data retrieved successfully");
  } catch (error) {
    return serverError("Failed to retrieve staff data", error.message);
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const req = await request.json();
    const newStaff = await staffModel.create(req);
    return created(newStaff, "Staff added successfully");
  } catch (error) {
    return serverError("Failed to add staff", error.message);
  }
}

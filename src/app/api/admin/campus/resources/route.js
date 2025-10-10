import ResourceModel from "@/models/admin/campus/resources.model";
import connectDB from "@/lib/coonectDb";
import { ok, created, serverError, badRequest } from "@/lib/apiResponse";
import { ResourceSchema } from "@/lib/validation/admin";
import { parsePageParams, paginateQuery } from "@/lib/pagination";

export async function GET(request) {
  try {
    await connectDB();
    const { page, pageSize, search } = parsePageParams(request);
    const filter = {};
    if (search) {
      filter.$or = [
        { resourceName: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
        { type: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
      ];
    }
    const baseQuery = ResourceModel.find(filter).sort({ updatedAt: -1 }).lean();
    const { data, total } = await paginateQuery(baseQuery, page, pageSize);
    return ok({ items: data, total, page, pageSize }, "Resources data retrieved successfully");
  } catch (error) {
    console.error("Error fetching resources:", error);
    return serverError("Failed to fetch resources", error.message);
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const parsed = ResourceSchema.safeParse(body);
    if (!parsed.success) {
      return badRequest("Validation failed", parsed.error.flatten());
    }
    const newResource = await ResourceModel.create(parsed.data);
    return created(newResource, "Resource added successfully");
  } catch (error) {
    return serverError("Failed to add resource", error.message);
  }
}
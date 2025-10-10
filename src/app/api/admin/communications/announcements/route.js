import AnnouncementModel from "@/models/admin/communications/announcements.model";
import connectDB from "@/lib/coonectDb";
import { ok, created, serverError, badRequest } from "@/lib/apiResponse";
import { AnnouncementSchema } from "@/lib/validation/admin";
import { parsePageParams, paginateQuery } from "@/lib/pagination";

export async function GET(request) {
  try {
    await connectDB();
    const { page, pageSize, search } = parsePageParams(request);

    const filter = {};
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ];
    }

    const baseQuery = AnnouncementModel.find(filter).sort({ publishDate: -1 }).lean();
    const { data, total } = await paginateQuery(baseQuery, page, pageSize);
    return ok({ items: data, total, page, pageSize }, "Announcements data retrieved successfully");
  } catch (error) {
    return serverError("Failed to retrieve announcements data", error.message);
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const parsed = AnnouncementSchema.safeParse(body);
    if (!parsed.success) {
      return badRequest("Validation failed", parsed.error.flatten());
    }
    const announcement = await AnnouncementModel.create(parsed.data);
    return created(announcement, "Announcement created successfully");
  } catch (error) {
    return serverError("Failed to create announcement", error.message);
  }
}

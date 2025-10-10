import EventModel from "@/models/admin/campus/events.model";
import connectDB from "@/lib/coonectDb";
import { ok, created, serverError, badRequest } from "@/lib/apiResponse";
import { EventSchema } from "@/lib/validation/admin";
import { parsePageParams, paginateQuery } from "@/lib/pagination";

export async function GET(request) {
  try {
    await connectDB();
    const { page, pageSize, search } = parsePageParams(request);
    const filter = {};
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ];
    }
    const baseQuery = EventModel.find(filter).sort({ date: -1 }).lean();
    const { data, total } = await paginateQuery(baseQuery, page, pageSize);
    return ok({ items: data, total, page, pageSize }, "Events data retrieved successfully");
  } catch (error) {
    console.error("Error fetching events:", error);
    return serverError("Failed to fetch events", error.message);
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const parsed = EventSchema.safeParse(body);
    if (!parsed.success) {
      return badRequest("Validation failed", parsed.error.flatten());
    }
    const newEvent = await EventModel.create(parsed.data);
    return created(newEvent, "Event added successfully");
  } catch (error) {
    return serverError("Failed to add event", error.message);
  }
}
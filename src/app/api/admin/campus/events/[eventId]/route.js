import EventModel from "@/models/admin/campus/events.model";
import connectDB from "@/lib/coonectDb";
import { ok, notFound, serverError } from "@/lib/apiResponse";

export async function GET(request, context) {
  try {
    await connectDB();
    const params = context.params;
    const eventId = params.eventId;
    const event = await EventModel.findById(eventId).lean();
    if (!event) return notFound("Event not found");
    return ok(event, "event data retrieved successfully");
  } catch (error) {
    return serverError("Failed to retrieve event data", error.message);
  }
}
export async function PUT(request, context) {
  try {
    await connectDB();
    const params = context.params;
    const eventId = params.eventId;
    const body = await request.json();
    const event = await EventModel.findOneAndUpdate({ _id: eventId }, { $set: { ...body } }, { new: true }).lean();
    if (!event) return notFound("Event not found");
    return ok(event, "event data updated successfully");
  } catch (error) {
    return serverError("Failed to update event data", error.message);
  }
}
export async function DELETE(request, context) {
  try {
    await connectDB();
    const params = context.params;
    const eventId = params.eventId;
    const event = await EventModel.findOneAndDelete({ _id: eventId }).lean();
    if (!event) return notFound("Event not found");
    return ok(null, "event data deleted successfully");
  } catch (error) {
    return serverError("Failed to delete event data", error.message);
  }
}
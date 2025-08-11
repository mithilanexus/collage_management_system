import EventModel from "@/models/admin/campus/events.model";
export async function GET(request) {
    try {
        const events = await EventModel.find();
        return Response.json({
            message: "Events data retrieved successfully",
            success: true,
            data: events,
        });
    } catch (error) {
        console.error("Error fetching events:", error);
        return Response.json({ error: "Failed to fetch events" }, { status: 500 });
    }
}
export async function POST(request) {
    try {
        const req = await request.json();
        const newEvent = await EventModel.create(req);
        return Response.json({
            message: "Event added successfully",
            success: true,
            data: newEvent,
        });
    } catch (error) {
        return Response.json({
            message: "Failed to add event",
            success: false,
            error: error.message,
        });
    }
}
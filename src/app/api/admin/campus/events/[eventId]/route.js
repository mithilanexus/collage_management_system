import EventModel from "@/models/admin/campus/events.model";
export async function GET(request, context) {
    
    try {
        const params = await context.params;
        const eventId = params.eventId;
        const event = await EventModel.findOne({ _id: eventId }).lean();
        return Response.json({
            message: "event data retrieved successfully",
            success: true,
            data: event,
        });
    } catch (error) {
        return Response.json({
            message: "Failed to retrieve event data",
            success: false,
            error: error.message,
        });
    }
}
export async function PUT(request, context) {
    
    try {
        const params = await context.params;
        const eventId = params.eventId;
        const body = await request.json(); // ✅ parse the body
        const event = await EventModel.findOneAndUpdate({ _id: eventId }, { $set: { ...body } }, { new: true }).lean();
        return Response.json({
            message: "event data updated successfully",
            success: true,
            data: event,
        });
    } catch (error) {
        return Response.json({
            message: "Failed to update event data",
            success: false,
            error: error.message,
        });
    }
}
export async function DELETE(request, context) {
    
    try {
        const params = await context.params;
        const eventId = params.eventId;
        const event = await EventModel.findOneAndDelete({ _id: eventId }).lean();
        return Response.json({
            message: "event data deleted successfully",
            success: true,
            data: event,
        });
    } catch (error) {
        return Response.json({
            message: "Failed to delete event data",
            success: false,
            error: error.message,
        });
    }
}
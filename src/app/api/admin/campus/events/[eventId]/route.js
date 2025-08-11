import EventModel from "@/models/admin/campus/events.model";
export async function GET(request, { params }) {
    
    try {
        
        const eventId = await params.eventId;
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
export async function PUT(request, { params }) {
    
    try {
        const eventId = await params.eventId;
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
export async function DELETE(request, { params }) {
    
    try {
        const eventId = await params.eventId;
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
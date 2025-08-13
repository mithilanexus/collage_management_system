
import AnnouncementModel from "@/models/admin/communications/announcements.model";

export async function GET(request, context) {
    try {
        const params = await context.params;

        const announcement = await AnnouncementModel.findById(params.announcementId).lean();
        return Response.json({
            message: "Announcement data retrieved successfully",
            success: true,
            data: announcement,
        });
    } catch (error) {
        return Response.json({
            message: "Failed to retrieve announcement data",
            success: false,
            error: error.message,
        });
    }
}
export async function PUT(request, context) {
    try {
        const params = await context.params;
        const body = await request.json();
        const announcement = await AnnouncementModel.findByIdAndUpdate(params.announcementId, body, { new: true }).lean();
        return Response.json({
            message: "Announcement updated successfully",
            success: true,
            data: announcement,
        });
    } catch (error) {
        return Response.json({
            message: "Failed to update announcement",
            success: false,
            error: error.message,
        });
    }
}
export async function DELETE(request, context) {
    try {
        const params = await context.params;
        const announcement = await AnnouncementModel.findByIdAndDelete(params.announcementId).lean();
        return Response.json({
            message: "Announcement deleted successfully",
            success: true,
            data: announcement,
        });
    } catch (error) {
        return Response.json({
            message: "Failed to delete announcement",
            success: false,
            error: error.message,
        });
    }
}
import AnnouncementModel from "@/models/admin/communications/announcements.model";

export async function GET() {
    try {
        const announcements = await AnnouncementModel.find({}).lean();
        return Response.json({
            message: "Announcements data retrieved successfully",
            success: true,
            data: announcements,
        });
    } catch (error) {
        return Response.json({
            message: "Failed to retrieve announcements data",
            success: false,
            error: error.message,
        });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const announcement = await AnnouncementModel.create(body);
        return Response.json({
            message: "Announcement created successfully",
            success: true,
            data: announcement,
        });
    } catch (error) {
        return Response.json({
            message: "Failed to create announcement",
            success: false,
            error: error.message,
        });
    }
}

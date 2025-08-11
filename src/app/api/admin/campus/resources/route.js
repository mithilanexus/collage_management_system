import ResourceModel from "@/models/admin/campus/resources.model";
export async function GET(request) {
    try {
        const resources = await ResourceModel.find();
        return Response.json({
            message: "Resources data retrieved successfully",
            success: true,
            data: resources,
        });
    } catch (error) {
        console.error("Error fetching resources:", error);
        return Response.json({ error: "Failed to fetch resources" }, { status: 500 });
    }
}
export async function POST(request) {
    try {
        const req = await request.json();
        const newResource = await ResourceModel.create(req);
        return Response.json({
            message: "Resource added successfully",
            success: true,
            data: newResource,
        });
    } catch (error) {
        return Response.json({
            message: "Failed to add resource",
            success: false,
            error: error.message,
        });
    }
}
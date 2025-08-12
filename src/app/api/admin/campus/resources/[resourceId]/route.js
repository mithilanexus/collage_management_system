import ResourceModel from "@/models/admin/campus/resources.model";
export async function GET(request, context) {
    
    try {
        const params = await context.params;
        const resourceId = params.resourceId;
        const resource = await ResourceModel.findOne({ _id: resourceId }).lean();
        return Response.json({
            message: "Resource data retrieved successfully",
            success: true,
            data: resource,
        });
    } catch (error) {
        return Response.json({
            message: "Failed to retrieve resource data",
            success: false,
            error: error.message,
        });
    }
}
export async function PUT(request, context) {
    
    try {
        const params = await context.params;
        const resourceId = params.resourceId;
        const body = await request.json(); // ✅ parse the body
        const resource = await ResourceModel.findOneAndUpdate({ _id: resourceId }, { $set: { ...body } }, { new: true }).lean();
        return Response.json({
            message: "Resource data updated successfully",
            success: true,
            data: resource,
        });
    } catch (error) {
        return Response.json({
            message: "Failed to update resource data",
            success: false,
            error: error.message,
        });
    }

}
export async function DELETE(request, context) {
    
    try {
        const params = await context.params;
        const resourceId = params.resourceId;
        const resource = await ResourceModel.findOneAndDelete({ _id: resourceId }).lean();
        if (!resource) {
            return Response.json({
                message: "Resource not found",
                success: false,
                error: "Resource not found",
            });
        }
        return Response.json({
            message: "Resource data deleted successfully",
            success: true,
            data: resource,
        });
    } catch (error) {
        return Response.json({
            message: "Failed to delete resource data",
            success: false,
            error: error.message,
        });
    }
}
        
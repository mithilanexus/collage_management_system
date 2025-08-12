export const dynamic = 'force-dynamic';
import facilitiesModel from "@/models/admin/campus/facilities.model";
export async function GET(request, context) {
    try {
        const params = await context.params; // await the whole context
        const facilityId = params.id;
        const facility = await facilitiesModel.findOne({ _id: facilityId }).lean();
        return Response.json({
            message: "facility data retrieved successfully",
            success: true,
            data: facility,
        });
    } catch (error) {
        return Response.json({
            message: "Failed to retrieve facility data",
            success: false,
            error: error.message,
        });
    }
}

export async function PUT(request, context) {
    try {
        const params = await context.params;
        const facilityId = params.id;

        const body = await request.json(); // ✅ parse the body
        const facility = await facilitiesModel
            .findOneAndUpdate(
                { _id: facilityId },
                { $set: { ...body } },
                { new: true }
            )
            .lean();

        return Response.json({
            message: "Facility data updated successfully",
            success: true,
            data: facility,
        });
    } catch (error) {
        return Response.json({
            message: "Failed to update facility data",
            success: false,
            error: error.message,
        });
    }
}

export async function DELETE(request, context) {
    try {
        const params = await context.params; // await the whole context
        const facilityId = params.id;
        const facility = await facilitiesModel.findOneAndDelete({ _id: facilityId }).lean();
        return Response.json({
            message: "facility data deleted successfully",
            success: true,
            data: facility,
        });
    } catch (error) {
        return Response.json({
            message: "Failed to delete facility data",
            success: false,
            error: error.message,
        });
    }
}
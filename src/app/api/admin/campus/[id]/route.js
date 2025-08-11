import facilitiesModel from "@/models/admin/facilitiy/facilities.model";

export async function GET(request, { params }) {
    try {
        const facilityId = await params.id;
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

export async function PUT(request, { params }) {
    try {
        const facilityId = await params.id;
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
export async function DELETE(request, { params }) {
    try {
        const facilityId = await params.id;
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
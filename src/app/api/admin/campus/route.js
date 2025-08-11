import facilitiesModel from "@/models/admin/campus/facilities.model";

export async function GET (){
    try {
        const facilities = await facilitiesModel.find({}).lean();
        return Response.json({
            message: "Facility data retrieved successfully",
            success: true,
            data: facilities,
        });
    } catch (error) {
        return Response.json({
            message: "Failed to retrieve facility data",
            success: false,
            error: error.message,
        });
    }

}

export async function POST(){
    try {
        const req = await request.json();
        const newFacility = await facilitiesModel.create(req);
        return Response.json({
            message: "Facility added successfully",
            success: true,
            data: newFacility,
        });
    } catch (error) {
        return Response.json({
            message: "Failed to add facility",
            success: false,
            error: error.message,
        });
    }
}
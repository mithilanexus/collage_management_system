export const dynamic = 'force-dynamic';
import facilitiesModel from "@/models/admin/campus/facilities.model";
import connectDB from "@/lib/coonectDb";
import { ok, notFound, serverError } from "@/lib/apiResponse";

export async function GET(request, context) {
  try {
    await connectDB();
    const params = context.params;
    const facilityId = params.id;
    const facility = await facilitiesModel.findById(facilityId).lean();
    if (!facility) return notFound("Facility not found");
    return ok(facility, "facility data retrieved successfully");
  } catch (error) {
    return serverError("Failed to retrieve facility data", error.message);
  }
}

export async function PUT(request, context) {
  try {
    await connectDB();
    const params = context.params;
    const facilityId = params.id;
    const body = await request.json();
    const facility = await facilitiesModel
      .findOneAndUpdate({ _id: facilityId }, { $set: { ...body } }, { new: true })
      .lean();
    if (!facility) return notFound("Facility not found");
    return ok(facility, "Facility data updated successfully");
  } catch (error) {
    return serverError("Failed to update facility data", error.message);
  }
}

export async function DELETE(request, context) {
  try {
    await connectDB();
    const params = context.params;
    const facilityId = params.id;
    const facility = await facilitiesModel.findOneAndDelete({ _id: facilityId }).lean();
    if (!facility) return notFound("Facility not found");
    return ok(null, "facility data deleted successfully");
  } catch (error) {
    return serverError("Failed to delete facility data", error.message);
  }
}
import ResourceModel from "@/models/admin/campus/resources.model";
import connectDB from "@/lib/coonectDb";
import { ok, notFound, serverError } from "@/lib/apiResponse";

export async function GET(request, context) {
  try {
    await connectDB();
    const params = context.params;
    const resourceId = params.resourceId;
    const resource = await ResourceModel.findById(resourceId).lean();
    if (!resource) return notFound("Resource not found");
    return ok(resource, "Resource data retrieved successfully");
  } catch (error) {
    return serverError("Failed to retrieve resource data", error.message);
  }
}
export async function PUT(request, context) {
  try {
    await connectDB();
    const params = context.params;
    const resourceId = params.resourceId;
    const body = await request.json();
    const resource = await ResourceModel.findOneAndUpdate(
      { _id: resourceId },
      { $set: { ...body } },
      { new: true }
    ).lean();
    if (!resource) return notFound("Resource not found");
    return ok(resource, "Resource data updated successfully");
  } catch (error) {
    return serverError("Failed to update resource data", error.message);
  }
}
export async function DELETE(request, context) {
  try {
    await connectDB();
    const params = context.params;
    const resourceId = params.resourceId;
    const resource = await ResourceModel.findOneAndDelete({ _id: resourceId }).lean();
    if (!resource) return notFound("Resource not found");
    return ok(null, "Resource data deleted successfully");
  } catch (error) {
    return serverError("Failed to delete resource data", error.message);
  }
}
        
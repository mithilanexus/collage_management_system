import staffModel from "@/models/staff/Staff.model";
import connectDB from "@/lib/coonectDb";
import { ok, notFound, serverError } from "@/lib/apiResponse";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const staffId = params.id;
    const staff = await staffModel.findById(staffId).lean();
    if (!staff) return notFound("Staff not found");
    return ok(staff, "Staff data retrieved successfully");
  } catch (error) {
    return serverError("Failed to retrieve staff data", error.message);
  }
}

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const req = await request.json();
    const staffId = params.id;
    const staff = await staffModel.findOneAndUpdate({ _id: staffId }, req, { new: true }).lean();
    if (!staff) return notFound("Staff not found");
    return ok(staff, "Staff updated successfully");
  } catch (error) {
    return serverError("Failed to update staff", error.message);
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const staffId = params.id;
    const deleted = await staffModel.findOneAndDelete({ _id: staffId }).lean();
    if (!deleted) return notFound("Staff not found");
    return ok(null, "Staff deleted successfully");
  } catch (error) {
    return serverError("Failed to delete staff", error.message);
  }
}

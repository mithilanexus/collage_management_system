import staffModel from "@/models/staff/Staff.model";

export async function GET() {
  try {
    const staffs = await staffModel.find({}).lean();
    return Response.json({
      message: "Staff data retrieved successfully",
      success: true,
      data: staffs,
    });
  } catch (error) {
    return Response.json({
      message: "Failed to retrieve staff data",
      success: false,
      error: error.message,
    });
  }
}

export async function POST(request) {
  const req = await request.json();
  try {
    const newStaff = await staffModel.create(req);
    return Response.json({
      message: "Staff added successfully",
      success: true,
      data: newStaff,
    });
  } catch (error) {
    return Response.json({
      message: "Failed to add staff",
      success: false,
      error: error.message,
    });
  }
}

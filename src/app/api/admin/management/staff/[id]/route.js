import staffModel from "@/models/staff/Staff.model";

export async function GET(request, { params }) {
  try {
    const staffId = await params.id;
    const staff = await staffModel.findOne({ _id: staffId }).lean();
    return Response.json({
      message: "Staff data retrieved successfully",
      success: true,
      data: staff,
    });
  } catch (error) {
    return Response.json({
      message: "Failed to retrieve staff data",
      success: false,
      error: error.message,
    });
  }
}

export async function PUT(request, { params }) {
  const req = await request.json();
  try {
    const staffId = await params.id;
    const staff = await staffModel.findOneAndUpdate(
      {
        _id: staffId,
      },
      req,
      { new: true }
    );
    return Response.json({
      message: "Staff updated successfully",
      success: true,
      data: staff,
    });
  } catch (error) {
    return Response.json({
      message: "Failed to update staff",
      success: false,
      error: error.message,
    });
  }
}

export async function DELETE(request, { params }) {
  try {
    const staffId = await params.id;
    await staffModel.findOneAndDelete({
      _id: staffId,
    });
    return Response.json({
      message: "Staff deleted successfully",
      success: true,
    });
  } catch (error) {
    return Response.json({
      message: "Failed to delete staff",
      success: false,
      error: error.message,
    });
  }
}

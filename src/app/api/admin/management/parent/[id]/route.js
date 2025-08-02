 
import parentModel from "@/models/parent/Parent.model";
import "@/models/student/Student.model";
export async function GET(request, { params }) {
  try {
    const parentId = params.id; // ✅ no await needed
    const parent = await parentModel
      .findOne({ _id: parentId })
      .populate("students")
      .lean();

    return Response.json({
      message: "Parents data retrieved successfully",
      success: true,
      data: parent,
    });
  } catch (error) {
    return Response.json({
      message: "Failed to retrieve parents data",
      success: false,
      data: [],
      error: error.message, // 💡 better to return just the message
    });
  }
}

export async function PUT(request, { params }) {
  const req = await request.json();
  try {
    const parentId = await params.id;
    const parent = await parentModel
      .findOneAndUpdate(
        {
          _id: parentId,
        },
        req,
        { new: true }
      )
      .lean();
    return Response.json({
      message: "Parents data updated successfully",
      success: true,
      data: parent,
    });
  } catch (error) {
    return Response.json({
      message: "Failed to update parents data",
      success: false,
      error,
    });
  }
}

export async function DELETE(request, { params }) {
  try {
    const parentId = await params.id;
    await parentModel.findOneAndDelete({
      _id: parentId,
    });
    return Response.json({
      message: "Parents data deleted successfully",
      success: true,
    });
  } catch (error) {
    return Response.json({
      message: "Failed to delete parents data",
      success: false,
      error,
    });
  }
}

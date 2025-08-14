import PrimaryClassModel from "@/models/admin/course/primary/primaryLevelClass.model";
import "@/models"; // Import models to ensure they're registered

export async function GET(request, { params }) {
  try {
    const classId = params.classId;
    const classData = await PrimaryClassModel.findOne({ _id: classId })
    .populate({
      path: 'subjects',
      model: 'PrimarySubject', 
    })
    .lean();
    return Response.json({
      message: "Primary class retrieved successfully",
      success: true,
      data: classData,
    });
  } catch (error) {
    return Response.json({
      message: "Failed to retrieve primary class",
      success: false,
      error: error.message,
    });
  }
}

export async function PUT(request, { params }) {
  const req = await request.json();
  try {
    const classId = params.classId;
    const updatedClass = await PrimaryClassModel.findOneAndUpdate(
      { _id: classId },
      req,
      { new: true }
    ).lean();
    return Response.json({
      message: "Primary class updated successfully",
      success: true,
      data: updatedClass,
    });
  } catch (error) {
    return Response.json({
      message: "Failed to update primary class",
      success: false,
      error: error.message,
    });
  }
}

export async function DELETE(request, { params }) {
  try {
    const classId = params.classId;
    await PrimaryClassModel.findOneAndDelete({ _id: classId });
    return Response.json({
      message: "Primary class deleted successfully",
      success: true,
    });
  } catch (error) {
    return Response.json({
      message: "Failed to delete primary class",
      success: false,
      error: error.message,
    });
  }
}

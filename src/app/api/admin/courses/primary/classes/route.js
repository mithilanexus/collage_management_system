import PrimaryClassModel from "@/models/admin/course/primary/primaryLevelClass.model";

export async function GET() {
  const classes = await PrimaryClassModel.find({}).lean();
  try {
    return Response.json({
      message: "Primary classes retrieved successfully",
      success: true,
      data: [...classes],
    });
  } catch (error) {
    return Response.json({
      message: "Failed to retrieve primary classes",
      success: false,
      error: error.message,
    });
  }
}

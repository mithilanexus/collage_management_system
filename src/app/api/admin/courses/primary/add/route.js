import PrimaryClassModel from "@/models/admin/course/primary/primaryLevelClass.model";

export async function POST(request) {
  const req = await request.json();
  try {
    const newClass = await PrimaryClassModel.create(req);
    return Response.json({
      message: "Primary class added successfully",
      success: true,
      data: newClass,
    });
  } catch (error) {
    return Response.json({
      message: "Failed to add primary class",
      success: false,
      error: error.message,
    });
  }
}

export async function GET() {
  try {
    const classes = await PrimaryClassModel.find({}).lean();
    return Response.json({
      message: "Primary classes retrieved successfully",
      success: true,
      data: classes,
    });
  } catch (error) {
    return Response.json({
      message: "Failed to retrieve primary classes",
      success: false,
      error: error.message,
    });
  }
}

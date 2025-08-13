 
import PrimaryClassModel from "@/models/admin/course/primary/primaryLevelClass.model";
import "@/models"; // Import models to ensure they're registered

export async function GET() {
  try { 
    
    const classes = await PrimaryClassModel.find({})
      .populate({
        path: 'subjects',
        model: 'PrimarySubject',
        select: 'name'
      })
      .lean();

    return Response.json({
      message: "Primary classes retrieved successfully",
      success: true,
      data: classes,
    });
  } catch (error) {
    console.error("Error in GET /api/admin/courses/primary/classes:", error);
    return Response.json(
      {
        message: "Failed to retrieve primary classes",
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}

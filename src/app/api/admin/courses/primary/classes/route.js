 import PrimaryClassModel from "@/models/admin/course/primary/primaryLevelClass.model";
 import "@/models"; // Import models to ensure they're registered
 import connectDB from "@/lib/coonectDb";
 import { ok, serverError } from "@/lib/apiResponse";

 export async function GET() {
   try {
     await connectDB();
     const classes = await PrimaryClassModel.find({})
       .populate({
         path: "subjects",
         model: "PrimarySubject",
         select: "name",
       })
       .lean();

     return ok(classes, "Primary classes retrieved successfully");
   } catch (error) {
     console.error("Error in GET /api/admin/courses/primary/classes:", error);
     return serverError("Failed to retrieve primary classes", error.message);
   }
 }

 import parentModel from "@/models/parent/Parent.model";
 import "@/models/admin/management/student/Student.model";
 import connectDB from "@/lib/coonectDb";
 import { ok, notFound, serverError } from "@/lib/apiResponse";

 export async function GET(request, { params }) {
   try {
     await connectDB();
     const parentId = params.id;
     const parent = await parentModel
       .findById(parentId)
       .populate("students")
       .lean();
     if (!parent) return notFound("Parent not found");
     return ok(parent, "Parents data retrieved successfully");
   } catch (error) {
     return serverError("Failed to retrieve parents data", error.message);
   }
 }

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const req = await request.json();
    const parentId = params.id;
    const parent = await parentModel
      .findOneAndUpdate({ _id: parentId }, req, { new: true })
      .lean();
    if (!parent) return notFound("Parent not found");
    return ok(parent, "Parents data updated successfully");
  } catch (error) {
    return serverError("Failed to update parents data", error.message);
  }
}

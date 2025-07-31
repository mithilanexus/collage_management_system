import parentModel from "@/models/parent/Parent.model";
import { generateParentId } from "@/utils/getUinqueId";

export async function GET() {
  try {
    const parents = await parentModel.find({}).lean();
    return Response.json({
      message: "Parents data retrieved successfully",
      success: true,
      data: parents,
    });
  } catch (error) {
    return Response.json({
      message: "Failed to retrieve parents data",
      success: false,
      error,
    });
  }
}
export async function POST(request) {
  const req = await request.json();
  try {
    const parentId = generateParentId(
      req.fatherName,
      req.fatherPhone,
      req.citizenshipNumber || req.motherPhone
    );
    req.parentId = parentId;
    const newParent = await parentModel.create(req);
    const res = {
      message: "Parent added successfully",
      success: true,
      data: newParent,
    };
    return Response.json({ data: res });
  } catch (error) {
    const res = {
      message: "Parent added failed",
      success: false,
      error,
    };
    return Response.json({ data: res });
  }
}

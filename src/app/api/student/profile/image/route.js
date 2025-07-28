import cloudinary from "@/lib/cloudinary";
import { UserModel } from "@/models/user/User.model";
import { getLoginedUser } from "@/utils/loginedUser";
import { NextResponse } from "next/server";

export async function GET() {
  const loginedUser = await getLoginedUser();
  const user = await UserModel.findOne({ email: loginedUser.email });
  if (!user) {
    return NextResponse.json(
      { success: false, message: "No token found 🥺" },
      { status: 401 }
    );
  }

  return NextResponse.json({
    success: true,
    message: "Image retrieved successfully",
    imageUrl: user.profileImg,
  });
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("profileImage");
    const buffer = Buffer.from(await file.arrayBuffer());

    const res = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "profileImage" }, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        })
        .end(buffer);
    });
    console.log(res.secure_url);
    const loginedUser = await getLoginedUser();
    const user = await UserModel.findOne({ email: loginedUser.email });
    user.profileImg = res.secure_url;  // Changed from profileImage to profileImg to match schema
    const updatedUser = await user.save();
    console.log("Updated user:", updatedUser);

    return NextResponse.json({
      success: true,
      message: "Image uploaded successfully",
      imageUrl: res.secure_url,
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { success: false, message: "Failed to process request" },
      { status: 400 }
    );
  }
}

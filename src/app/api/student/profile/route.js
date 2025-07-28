import { UserModel } from "@/models/user/User.model";
import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  try {
    const cookie = request.cookies.get("token");

    if (!cookie?.value) {
      return NextResponse.json(
        { success: false, message: "No token found 🥺" },
        { status: 401 }
      );
    }

    const { payload } = await jwtVerify(cookie.value, secret);

    const user = await UserModel.findOne({ email: payload.email }).lean();

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found 💔" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Profile data retrieved successfully 💕",
      data: user,
    });
  } catch (error) {
    console.error("💥 Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to process request 😢" },
      { status: 500 }
    );
  }
}

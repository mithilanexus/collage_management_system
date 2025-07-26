export const dynamic = "force-static";

import { comparePassword } from "@/lib/AuthHandler";
import { UserModel } from "@/models/user/User.model";

import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const res = {
    message: "Hello World",
    success: true,
  };
  const data = res;

  return Response.json({ data });
}

export async function POST(request) {
  try {
    const userData = await request.json();
    const { email, password } = userData;
    const user = await UserModel.findOne({ email }).select("+password");
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 400 }
      );
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 400 }
      );
    }
    return NextResponse.json({
      success: true,
      message: "Login successful",
      data: user,
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { success: false, message: "Failed to process request" },
      { status: 400 }
    );
  }
}

export const dynamic = "force-static";

import { hashPassword } from "@/lib/AuthHandler";
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
    const { firstName, lastName, email, password, role } = userData;
    const hashedPassword = await hashPassword(password);
    const newUser = await UserModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
    });
    await newUser.save();
    console.log("Received user data:", userData);

    return NextResponse.json({
      success: true,
      message: "Data saved successfully",
      data: userData,
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { success: false, message: "Failed to process request" },
      { status: 400 }
    );
  }
}

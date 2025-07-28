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
    
    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await UserModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
    });

    console.log("Received user data:", userData);

    return NextResponse.json({
      success: true,
      message: "User registered successfully",
      data: {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to process request" },
      { status: 400 }
    );
  }
}

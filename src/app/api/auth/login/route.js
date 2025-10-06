export const dynamic = "force-dynamic";

import jwt from "jsonwebtoken";
import { comparePassword } from "@/lib/AuthHandler";
import { UserModel } from "@/models/user/User.model";
import { serialize } from "cookie";
import { NextResponse } from "next/server";

export async function GET(request) {
  const res = {
    message: "Hello World",
    success: true,
  };
  const data = res;

  return NextResponse.json({ data });
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
    let data = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      verified: user.verified,
    };
    const token = jwt.sign({ ...data }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });

    user.verificationToken = token;
    user.verified = true;
    await user.save();

    const cookie = serialize("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 2, // 2 days
      path: "/",
    });

    const res = NextResponse.json({
      success: true,
      message: "Login successful",
      data: user,
    });
    res.headers.set("Set-Cookie", cookie);
    return res;
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { success: false, message: "Failed to process request" },
      { status: 400 }
    );
  }
}

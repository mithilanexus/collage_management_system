export const dynamic = "force-static";

import jwt from "jsonwebtoken";
import { comparePassword } from "@/lib/AuthHandler";
import { UserModel } from "@/models/user/User.model";

import { serialize } from "cookie";

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
    delete user.password;

    delete user._id;
    const token = jwt.sign({ user }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    user.verificationToken = token;
    user.verified = true;
    await user.save();

    const cookie = serialize("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 3600,
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

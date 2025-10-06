export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { verifyJWT } from "@/lib/authSession";

export async function GET(request) {
  try {
    const cookie = request.cookies.get("token");
    if (!cookie) {
      return NextResponse.json(
        { success: false, message: "No token found" },
        { status: 400 }
      );
    }

    const payload = await verifyJWT(cookie.value);
    if (!payload) {
      return NextResponse.json(
        { success: false, message: "Invalid token" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Cookie found",
      data: payload,
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { success: false, message: "Failed to process request" },
      { status: 400 }
    );
  }
}

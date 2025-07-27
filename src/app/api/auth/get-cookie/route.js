import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
export async function GET(request) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  try {
    const cookie = request.cookies.get("token");
     

    const decoded = await jwtVerify(cookie.value, secret);

    if (!cookie) {
      return NextResponse.json(
        { success: false, message: "No token found" },
        { status: 400 }
      );
    }
    return NextResponse.json({
      success: true,
      message: "Cookie found",
      data: decoded.payload,
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { success: false, message: "Failed to process request" },
      { status: 400 }
    );
  }
}

import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const url = new URL(request.url);
  const path = url.pathname;

  // Read token from cookies
  const cookie = request.cookies.get("token");
  const token = cookie?.value;

  // Paths requiring auth: /admin/*, /student/*, and /api/admin/*
  const needsAuth = path.startsWith("/admin") || path.startsWith("/student") || path.startsWith("/api/admin");
  if (!needsAuth) {
    return NextResponse.next();
  }

  if (!token) {
    // For pages: redirect to login. For API: return 401 JSON
    if (path.startsWith("/api/")) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    const role = String(payload?.role || "").toLowerCase().trim();
    console.log(role);
    

    // Role-based protection for pages and admin APIs
    if (path.startsWith("/admin") || path.startsWith("/api/admin")) {
      if (role !== "admin") {
        if (path.startsWith("/api/")) {
          return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 });
        }
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }
    }

    if (path.startsWith("/student")) {
      if (role !== "student") {
        if (path.startsWith("/api/")) {
          return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 });
        }
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }
    }

    return NextResponse.next();
  } catch (_err) {
    if (path.startsWith("/api/")) {
      return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/student/:path*",
    "/api/admin/:path*",
    "/api/student/:path*",
  ],
};

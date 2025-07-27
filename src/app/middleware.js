import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(request) {
  const pathname = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value;

  // Skip middleware for public routes and static files
  const publicRoutes = [
    "/",
    "/about",
    "/courses",
    "/faculty",
    "/alumni",
    "/gallery",
    "/news",
    "/notice",
    "/faq",
    "/calendar",
    "/library",
    "/help",
    "/privacy",
    "/terms",
    "/contact",
    "/auth/login",
    "/auth/register",
    "/unauthorized",
    "/api",
  ];

  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  const isStaticFile =
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.includes(".");

  if (isPublicRoute || isStaticFile) {
    return NextResponse.next();
  }

  // Check authentication for protected routes
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  try {
    const { payload } = await jwtVerify(token, secret);
    console.log(payload);
    // Role-based protection
    if (pathname.startsWith("/admin") && payload.role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    if (pathname.startsWith("/student") && payload.role !== "student") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    if (pathname.startsWith("/faculty") && payload.role !== "faculty") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    return NextResponse.next();
  } catch (err) {
    console.error("JWT verification failed:", err);
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

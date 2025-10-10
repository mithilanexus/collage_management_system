import { NextResponse } from "next/server";

function json(status, body) {
  return NextResponse.json(body, { status });
}

export const ok = (data = null, message = "OK") => json(200, { success: true, message, data });
export const created = (data = null, message = "Created") => json(201, { success: true, message, data });
export const badRequest = (message = "Bad Request", error) => json(400, { success: false, message, error });
export const unauthorized = (message = "Unauthorized") => json(401, { success: false, message });
export const forbidden = (message = "Forbidden") => json(403, { success: false, message });
export const notFound = (message = "Not Found") => json(404, { success: false, message });
export const conflict = (message = "Conflict", error) => json(409, { success: false, message, error });
export const serverError = (message = "Internal Server Error", error) => json(500, { success: false, message, error });

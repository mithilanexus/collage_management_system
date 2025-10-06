import { jwtVerify } from "jose";

// Verifies a JWT using the shared JWT_SECRET
export async function verifyJWT(token) {
  if (!token) return null;
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload; // { firstName, lastName, email, role, verified, iat, exp }
  } catch (_err) {
    return null;
  }
}

// Convenience helper to read and verify the token from a Next.js Request
export async function getAuthFromRequest(request) {
  try {
    const cookie = request.cookies?.get?.("token");
    const token = cookie?.value;
    const payload = await verifyJWT(token);
    return { token, payload };
  } catch (_err) {
    return { token: null, payload: null };
  }
}

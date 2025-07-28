import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export async function getLoginedUser() {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const cookie = await cookies().get("token");

    if (!cookie?.value) {
      return null;
    }

    const { payload } = await jwtVerify(cookie.value, secret);
    return payload;
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
}

import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";



export async function middleware(request: NextRequest) {
  // Check for cookie
  const cookie = cookies().get("Authorization");
  if (!cookie) {
    return NextResponse.redirect(new URL("auth/login", request.url));
  }

  // Validate it
  const secret = new TextEncoder().encode(process.env.JWTKEY);
  const jwt = cookie.value;

  try {
    const { payload } = await jwtVerify(jwt, secret, {});
    console.log(payload);
  } catch (err) {
    return NextResponse.redirect(new URL("auth/login", request.url));
  }
}

export const config = {
  matcher: "/protected/:path*",
};
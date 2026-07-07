import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token");
  const isLoginPage = request.nextUrl.pathname === "/login";
  const isToolPage = request.nextUrl.pathname.startsWith("/tool");

  if (isToolPage && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isLoginPage && token) {
    return NextResponse.redirect(new URL("/tool", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/tool/:path*", "/login"],
};

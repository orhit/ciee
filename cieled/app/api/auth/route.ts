import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  if (
    username === process.env.AUTH_USER &&
    password === process.env.AUTH_PASS
  ) {
    const response = NextResponse.json({ success: true });
    // In a real app, use a proper session/JWT
    response.cookies.set("auth_token", "dummy-session-id", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });
    return response;
  }

  return NextResponse.json({ success: false }, { status: 401 });
}

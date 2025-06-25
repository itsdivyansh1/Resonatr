import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const protectedRoutes = ["/dashboard", "/settings", "/projects"];
const authRoutes = [
  "/login",
  "/register",
  "/forget-password",
  "/reset-password",
];

export async function middleware(request: NextRequest) {
  const session = getSessionCookie(request); // returns undefined if not logged in
  const { pathname } = request.nextUrl;

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isAuthRoute = authRoutes.includes(pathname);

  // 🚫 Block access to protected routes if not authenticated
  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 🔐 Block access to auth routes if already authenticated
  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

// Middleware only runs on these paths to improve performance
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/settings/:path*",
    "/projects/:path*",
    "/login",
    "/register",
    "/forget-password",
    "/reset-password",
  ],
};

import { NextRequest, NextResponse } from "next/server";
import { decodeJwtPayload } from "./utils/helper";

const AUTH_ROUTE = "/auth/sign-in";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookie = request.cookies.get("refreshToken");
  const token = cookie?.value;

  // Allow unauthenticated access to auth routes
  if (pathname.startsWith("/auth")) {
    if (token) {
      const decoded = decodeJwtPayload(token as string);
      if (decoded?.exp < Date.now() / 1000) {
        return NextResponse.next(); // let them access auth route if token expired
      }
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next(); // let them access auth route if no token
  }

  if (!token) {
    return redirectToLogin(request);
  }

  const { exp, role } = decodeJwtPayload(token);
  if (exp < Date.now() / 1000) {
    return redirectToLogin(request);
  }

  if (role !== "super_admin" && pathname === "/dashboard/users") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

// Helper function to redirect to login
function redirectToLogin(request: NextRequest) {
  const loginUrl = new URL(AUTH_ROUTE, request.url);
  loginUrl.searchParams.set("from", request.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api/|auth/forgot-password|auth/reset-password/|.*\\..*$).*)",
  ],
};

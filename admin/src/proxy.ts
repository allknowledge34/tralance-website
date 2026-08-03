import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

// We duplicate the secret logic here because edge runtimes support it.
const secretKey = process.env.SESSION_SECRET;
const key = new TextEncoder().encode(secretKey);

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Paths that do not require authentication
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/auth") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  const session = request.cookies.get("session")?.value;
  let isAuthenticated = false;

  if (session) {
    try {
      const { payload } = await jwtVerify(session, key, {
        algorithms: ["HS256"],
      });
      if (payload && payload.authenticated) {
        isAuthenticated = true;
      }
    } catch {
      // Invalid or expired token
      isAuthenticated = false;
    }
  }

  // If user is trying to access login page
  if (pathname === "/login") {
    if (isAuthenticated) {
      // Redirect logged-in user away from login page
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // All other routes require authentication
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};

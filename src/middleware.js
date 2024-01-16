import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const { pathname } = request.nextUrl;

  const authToken = request.cookies.get("authToken")?.value;
  if (pathname === "/api/login" || pathname === "/api/users") {
    return;
  }

  //if user is logged in then restricting user from again redirecting to login page
  const loggedInUsersNotAccessPaths =
    pathname === "/login" || pathname === "/signup";
  if (loggedInUsersNotAccessPaths) {
    if (authToken) {
      return NextResponse.redirect(new URL("/profile/user", request.url));
    }
  } else {
    if (!authToken) {
      if (pathname.startsWith("/api")) {
        return NextResponse.json(
          {
            messsage: "Access Denied",
            success: false,
          },
          { status: 401 }
        );
      }
      return NextResponse.redirect(new URL("/login", request.url)); //if user is not logged in & still accessing other routes then they will be redirected to login page
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/show-task",
    "/add-task",
    "/login",
    "/signup",
    "/profile/:path*",
    "/api/:path*",
  ],
};

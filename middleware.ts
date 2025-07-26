import { type NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only protect admin routes, but exclude the login page
  if (pathname.startsWith("/admin")) {
    // Allow access to login page without authentication
    if (pathname === "/admin/login") {
      return NextResponse.next()
    }

    // For all other admin routes, check if token exists
    const token = request.cookies.get("admin-token")?.value
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }

    // Token exists, allow access
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}

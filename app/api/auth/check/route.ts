import { type NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    console.log("Auth check - All cookies:", request.cookies.getAll())

    const token = request.cookies.get("admin-token")?.value
    console.log("Auth check - Token found:", !!token)

    if (!token) {
      console.log("Auth check - No token found")
      return NextResponse.json({ error: "No token found" }, { status: 401 })
    }

    const user = verifyToken(token)
    console.log("Auth check - User verified:", !!user)

    if (!user) {
      console.log("Auth check - Invalid token")
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    console.log("Auth check - Success for user:", user.username)
    return NextResponse.json({
      user: { id: user.id, username: user.username, role: user.role },
    })
  } catch (error) {
    console.error("Auth check error:", error)
    return NextResponse.json({ error: "Authentication failed" }, { status: 401 })
  }
}

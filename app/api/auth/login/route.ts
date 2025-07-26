import { type NextRequest, NextResponse } from "next/server"
import { authenticateUser, generateToken } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()
    console.log("Login attempt for username:", username)

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password are required" }, { status: 400 })
    }

    const user = await authenticateUser(username, password)
    console.log("User authentication result:", !!user)

    if (!user) {
      console.log("Authentication failed for username:", username)
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const token = generateToken(user)
    console.log("Generated token for user:", user.username)

    const response = NextResponse.json({
      message: "Login successful",
      user: { id: user.id, username: user.username, role: user.role },
    })

    // Set cookie with explicit path and domain
    response.cookies.set("admin-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 86400, // 24 hours
      path: "/", // Explicitly set path
    })

    console.log("Cookie set successfully for user:", user.username)
    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Login failed" }, { status: 500 })
  }
}

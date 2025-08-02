import { type NextRequest, NextResponse } from "next/server"
import { authenticateUser } from "@/lib/auth"
import { query } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    // Check if user exists
    const users = (await query("SELECT * FROM admin_users WHERE username = ?", [username])) as any[]
    const userExists = users.length > 0

    let isActive = false
    let passwordValid = false
    let userInfo = null

    if (userExists) {
      const user = users[0]
      isActive = user.is_active === 1 || user.is_active === true
      userInfo = {
        userId: user.id,
        username: user.username,
        role: user.role,
        isActive: user.is_active,
      }

      // Test password
      const authResult = await authenticateUser(username, password)
      passwordValid = !!authResult
    }

    return NextResponse.json({
      userExists,
      isActive,
      passwordValid,
      debug: userInfo,
    })
  } catch (error) {
    console.error("Debug error:", error)
    return NextResponse.json(
      {
        error: "Debug failed",
        debug: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

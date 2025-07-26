import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { query } from "./db"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export interface AdminUser {
  id: number
  username: string
  email: string
  role: "admin" | "staff"
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export function generateToken(user: AdminUser): string {
  return jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: "24h" })
}

export function verifyToken(token: string): AdminUser | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload & {
      id: number
      username: string
      role: "admin" | "staff"
    }

    // Verify that the decoded token has the required properties
    if (!decoded.id || !decoded.username || !decoded.role) {
      return null
    }

    return {
      id: decoded.id,
      username: decoded.username,
      role: decoded.role,
    }
  } catch (error) {
    console.error("Token verification failed:", error)
    return null
  }
}

export async function authenticateUser(username: string, password: string): Promise<AdminUser | null> {
  const users = (await query("SELECT * FROM admin_users WHERE username = ? AND is_active = TRUE", [username])) as any[]

  if (users.length === 0) return null

  const user = users[0]
  const isValid = await verifyPassword(password, user.password_hash)

  if (!isValid) return null

  return {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
  }
}

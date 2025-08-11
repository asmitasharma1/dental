import { type NextRequest, NextResponse } from "next/server"
import mysql from "mysql2/promise"

const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "dentalclinic",
  password: process.env.DB_PASSWORD || "gorkhali",
  database: process.env.DB_NAME || "dental_clinic",
}

export async function GET(request: NextRequest) {
  try {
    const connection = await mysql.createConnection(dbConfig)

    // Admin route returns all blogs (published and unpublished)
    const [rows] = await connection.execute(`
      SELECT 
        id,
        title,
        content,
        excerpt,
        author,
        image_url,
        published_date,
        is_published,
        created_at,
        updated_at
      FROM blogs 
      ORDER BY created_at DESC
    `)

    await connection.end()
    return NextResponse.json(rows)
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 })
  }
}

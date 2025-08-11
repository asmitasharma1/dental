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

    // Only return published blogs for public API
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
      WHERE is_published = 1
      ORDER BY published_date DESC
    `)

    await connection.end()
    return NextResponse.json(rows)
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, content, excerpt, author, image_url, is_published } = body

    const connection = await mysql.createConnection(dbConfig)

    const published_date = is_published ? new Date().toISOString().slice(0, 19).replace("T", " ") : null

    const [result] = await connection.execute(
      `INSERT INTO blogs 
       (title, content, excerpt, author, image_url, is_published, published_date, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [title, content, excerpt, author, image_url, is_published ? 1 : 0, published_date],
    )

    await connection.end()
    return NextResponse.json({ success: true, id: (result as any).insertId })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to create blog" }, { status: 500 })
  }
}

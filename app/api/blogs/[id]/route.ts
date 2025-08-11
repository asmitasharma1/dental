import { type NextRequest, NextResponse } from "next/server"
import mysql from "mysql2/promise"

const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "dentalclinic",
  password: process.env.DB_PASSWORD || "gorkhali",
  database: process.env.DB_NAME || "dental_clinic",
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const connection = await mysql.createConnection(dbConfig)

    const [rows] = await connection.execute(
      `SELECT 
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
      WHERE id = ? AND is_published = 1`,
      [id],
    )

    await connection.end()

    const blogs = rows as any[]
    if (blogs.length === 0) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 })
    }

    return NextResponse.json(blogs[0])
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()
    const { title, content, excerpt, author, image_url, is_published } = body

    const connection = await mysql.createConnection(dbConfig)

    // If publishing for the first time, set published_date
    let published_date = null
    if (is_published) {
      const [currentBlog] = await connection.execute("SELECT is_published, published_date FROM blogs WHERE id = ?", [
        id,
      ])
      const current = (currentBlog as any[])[0]
      if (!current.is_published && !current.published_date) {
        published_date = new Date().toISOString().slice(0, 19).replace("T", " ")
      }
    }

    const updateQuery = published_date
      ? `UPDATE blogs SET 
         title = ?, content = ?, excerpt = ?, author = ?, image_url = ?, 
         is_published = ?, published_date = ?, updated_at = NOW() 
         WHERE id = ?`
      : `UPDATE blogs SET 
         title = ?, content = ?, excerpt = ?, author = ?, image_url = ?, 
         is_published = ?, updated_at = NOW() 
         WHERE id = ?`

    const updateParams = published_date
      ? [title, content, excerpt, author, image_url, is_published ? 1 : 0, published_date, id]
      : [title, content, excerpt, author, image_url, is_published ? 1 : 0, id]

    await connection.execute(updateQuery, updateParams)
    await connection.end()

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const connection = await mysql.createConnection(dbConfig)

    await connection.execute("DELETE FROM blogs WHERE id = ?", [id])
    await connection.end()

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 })
  }
}

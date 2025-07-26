import { type NextRequest, NextResponse } from "next/server"
import mysql from "mysql2/promise"

const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "dentalclinic",
  password: process.env.DB_PASSWORD || "gorkhali",
  database: process.env.DB_NAME || "dental_clinic",
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { status } = await request.json()
    const appointmentId = params.id

    const connection = await mysql.createConnection(dbConfig)

    await connection.execute("UPDATE appointments SET status = ? WHERE id = ?", [status, appointmentId])

    await connection.end()

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to update appointment" }, { status: 500 })
  }
}

import { type NextRequest, NextResponse } from "next/server"
import mysql from "mysql2/promise"

const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "dentalclinic",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "dental_clinic",
}

export async function GET(request: NextRequest) {
  try {
    const connection = await mysql.createConnection(dbConfig)

    // Updated query to join with services table to get service title
    const [rows] = await connection.execute(`
      SELECT 
        a.id,
        a.first_name,
        a.last_name,
        a.email,
        a.phone,
        a.preferred_date,
        a.preferred_time,
        a.message,
        a.status,
        a.created_at,
        s.title as service_title
      FROM appointments a
      LEFT JOIN services s ON a.service_id = s.id
      ORDER BY a.created_at DESC
    `)

    await connection.end()


    return NextResponse.json(rows)
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to fetch appointments" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, phone, preferredDate, preferredTime, serviceId, message } = body

    const connection = await mysql.createConnection(dbConfig)

    const [result] = await connection.execute(
      `INSERT INTO appointments 
       (first_name, last_name, email, phone, preferred_date, preferred_time, service_id, message, status, created_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending', NOW())`,
      [firstName, lastName, email, phone, preferredDate, preferredTime, serviceId || null, message],
    )

    await connection.end()

    return NextResponse.json({ success: true, id: (result as any).insertId })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to create appointment" }, { status: 500 })
  }
}

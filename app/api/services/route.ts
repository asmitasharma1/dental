import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"

export async function GET() {
  try {
    const services = await query(
      "SELECT id, title, description, category, price, duration, is_active FROM services WHERE is_active = TRUE ORDER BY category, title"
    );
    return NextResponse.json(services)
  } catch (error) {
    console.error("Error fetching services:", error)
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, category, price, duration } = body

    if (!title || !category) {
      return NextResponse.json({ error: "Title and category are required" }, { status: 400 })
    }

    const result = await query(
      "INSERT INTO services (title, description, category, price, duration) VALUES (?, ?, ?, ?, ?)",
      [title, description, category, price, duration],
    )

    return NextResponse.json({ message: "Service created successfully", id: (result as any).insertId }, { status: 201 })
  } catch (error) {
    console.error("Error creating service:", error)
    return NextResponse.json({ error: "Failed to create service" }, { status: 500 })
  }
}

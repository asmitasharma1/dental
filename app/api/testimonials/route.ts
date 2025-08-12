import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"

export async function GET() {
  try {
    const testimonials = await query("SELECT * FROM testimonials ORDER BY is_active DESC, created_at DESC")
    return NextResponse.json(testimonials)
  } catch (error) {
    console.error("Error fetching testimonials:", error)
    return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, service, quote, rating, is_active } = body

    if (!name || !quote || !rating) {
      return NextResponse.json({ error: "Name, quote, and rating are required" }, { status: 400 })
    }

    const result = await query(
      "INSERT INTO testimonials (name, service, quote, rating, is_active) VALUES (?, ?, ?, ?, ?)",
      [name, service || null, quote, rating, is_active !== undefined ? is_active : true],
    )

    return NextResponse.json(
      {
        message: "Testimonial created successfully",
        id: (result as any).insertId,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating testimonial:", error)
    return NextResponse.json({ error: "Failed to create testimonial" }, { status: 500 })
  }
}

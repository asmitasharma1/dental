import { NextResponse } from "next/server"
import { query } from "@/lib/db"

export async function GET() {
  try {
    const testimonials = await query("SELECT * FROM testimonials WHERE is_active = TRUE ORDER BY created_at DESC")
    return NextResponse.json(testimonials)
  } catch (error) {
    console.error("Error fetching public testimonials:", error)
    return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 })
  }
}

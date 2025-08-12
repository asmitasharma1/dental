import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const testimonials = await query("SELECT * FROM testimonials WHERE id = ?", [params.id])

    if (!Array.isArray(testimonials) || testimonials.length === 0) {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 })
    }

    return NextResponse.json(testimonials[0])
  } catch (error) {
    console.error("Error fetching testimonial:", error)
    return NextResponse.json({ error: "Failed to fetch testimonial" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { name, service, quote, rating, is_active } = body

    if (!name || !quote || !rating) {
      return NextResponse.json({ error: "Name, quote, and rating are required" }, { status: 400 })
    }

    await query(
      "UPDATE testimonials SET name = ?, service = ?, quote = ?, rating = ?, is_active = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
      [name, service || null, quote, rating, is_active !== false, params.id],
    )

    return NextResponse.json({ message: "Testimonial updated successfully" })
  } catch (error) {
    console.error("Error updating testimonial:", error)
    return NextResponse.json({ error: "Failed to update testimonial" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await query("DELETE FROM testimonials WHERE id = ?", [params.id])
    return NextResponse.json({ message: "Testimonial deleted successfully" })
  } catch (error) {
    console.error("Error deleting testimonial:", error)
    return NextResponse.json({ error: "Failed to delete testimonial" }, { status: 500 })
  }
}

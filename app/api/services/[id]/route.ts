import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const services = (await query(
      `SELECT id, title, description, category, price, duration, image_url,
       why_use_service, what_if_not_used, before_appointment, after_service, is_active
       FROM services WHERE id = ? AND is_active = TRUE`,
      [id],
    )) as any[]

    if (!services || services.length === 0) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 })
    }

    return NextResponse.json(services[0])
  } catch (error) {
    console.error("Error fetching service:", error)
    return NextResponse.json({ error: "Failed to fetch service" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const body = await request.json()
    const {
      title,
      description,
      category,
      price,
      duration,
      image_url,
      why_use_service,
      what_if_not_used,
      before_appointment,
      after_service,
    } = body

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 })
    }

    const result = await query(
      `UPDATE services SET title = ?, description = ?, category = ?, price = ?, duration = ?, 
       image_url = ?, why_use_service = ?, what_if_not_used = ?, before_appointment = ?, after_service = ?
       WHERE id = ? AND is_active = TRUE`,
      [
        title,
        description,
        category,
        price,
        duration,
        image_url,
        why_use_service,
        what_if_not_used,
        before_appointment,
        after_service,
        id,
      ],
    )

    if ((result as any).affectedRows === 0) {
      return NextResponse.json({ error: "Service not found or already deleted" }, { status: 404 })
    }

    return NextResponse.json({ message: "Service updated successfully" })
  } catch (error) {
    console.error("Error updating service:", error)
    return NextResponse.json({ error: "Failed to update service" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const result = await query("UPDATE services SET is_active = FALSE WHERE id = ?", [id])

    if ((result as any).affectedRows === 0) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Service deleted successfully" })
  } catch (error) {
    console.error("Error deleting service:", error)
    return NextResponse.json({ error: "Failed to delete service" }, { status: 500 })
  }
}

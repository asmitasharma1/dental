// gallery/[id]/route.ts
import { type NextRequest, NextResponse } from "next/server"
import { unlink } from "fs/promises"
import path from "path"
import { query } from "@/lib/db"

const VALID_CATEGORIES = ["Clinic Interior", "Equipment", "Treatment Rooms", "Procedures"]

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { alt, category } = await request.json()
    const id = params.id

    if (!alt || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (!VALID_CATEGORIES.includes(category)) {
      return NextResponse.json(
        { error: `Invalid category. Must be one of: ${VALID_CATEGORIES.join(", ")}` },
        { status: 400 }
      )
    }

    const result = await query("UPDATE gallery_images SET alt = ?, category = ? WHERE id = ?", [
      alt,
      category,
      id,
    ])

    if ((result as any).affectedRows === 0) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Image updated successfully" })
  } catch (error) {
    console.error("Update error:", error)
    return NextResponse.json({ error: "Failed to update image" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // Get image info before deleting
    const images = (await query("SELECT src FROM gallery_images WHERE id = ?", [id])) as any[]

    if (images.length === 0) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 })
    }

    const image = images[0]

    // Delete from database
    const result = await query("DELETE FROM gallery_images WHERE id = ?", [id])

    if ((result as any).affectedRows === 0) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 })
    }

    // Delete file
    try {
      const filePath = path.join(process.cwd(), "public", image.src)
      await unlink(filePath)
    } catch (fileError) {
      console.error("File deletion error:", fileError)
      // Continue even if file deletion fails
    }

    return NextResponse.json({ message: "Image deleted successfully" })
  } catch (error) {
    console.error("Delete error:", error)
    return NextResponse.json({ error: "Failed to delete image" }, { status: 500 })
  }
}
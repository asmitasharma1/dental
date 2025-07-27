// gallery/route.ts
import { type NextRequest, NextResponse } from "next/server"
import { writeFile } from "fs/promises"
import path from "path"
import { query } from "@/lib/db"
import { unlink } from "fs/promises"

// Valid categories for the gallery
const VALID_CATEGORIES = ["Clinic Interior", "Equipment", "Treatment Rooms", "Procedures"]

export async function GET(request: NextRequest) {
  try {
    const images = await query("SELECT * FROM gallery_images")
    return NextResponse.json(images)
  } catch (error) {
    console.error("Error fetching images:", error)
    return NextResponse.json({ error: "Failed to fetch images" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const alt = formData.get("alt") as string
    const category = formData.get("category") as string

    // Validate inputs
    if (!file) {
      return NextResponse.json({ error: "Image file is required" }, { status: 400 })
    }
    if (!alt || alt.trim() === "") {
      return NextResponse.json({ error: "Description is required" }, { status: 400 })
    }
    if (!category || !VALID_CATEGORIES.includes(category)) {
      return NextResponse.json(
        { error: `Invalid category. Must be one of: ${VALID_CATEGORIES.join(", ")}` },
        { status: 400 }
      )
    }

    // Validate file type (only images)
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"]
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Invalid file type. Only images are allowed." }, { status: 400 })
    }

    // Generate unique filename
    const timestamp = Date.now()
    const extension = path.extname(file.name)
    const filename = `${timestamp}-${file.name.replace(/\s/g, "-").toLowerCase()}`
    const filePath = path.join(process.cwd(), "public", "uploads", filename)

    // Save file to public/uploads
    const buffer = Buffer.from(await file.arrayBuffer())
    await writeFile(filePath, buffer)

    // Save to database
    const src = `/uploads/${filename}`
    const result = await query(
      "INSERT INTO gallery_images (src, alt, category, created_at) VALUES (?, ?, ?, NOW())",
      [src, alt.trim(), category]
    )

    return NextResponse.json({ message: "Image uploaded successfully", id: (result as any).insertId })
  } catch (error) {
    console.error("Error uploading image:", error)
    return NextResponse.json({ error: "Failed to upload image" }, { status: 500 })
  }
}

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
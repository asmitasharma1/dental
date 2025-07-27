import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"
import { unlink } from "fs/promises"
import path from "path"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { name, position, degree, nmcNumber, linkedin, specialties } = await request.json()
    const id = params.id

    if (!name || !position || !degree || !nmcNumber || !specialties) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Validate specialties as valid JSON array
    let specialtiesArray
    try {
      specialtiesArray = JSON.parse(specialties)
      if (!Array.isArray(specialtiesArray)) {
        return NextResponse.json({ error: "Specialties must be an array" }, { status: 400 })
      }
      if (specialtiesArray.length === 0) {
        return NextResponse.json({ error: "At least one specialty is required" }, { status: 400 })
      }
    } catch {
      return NextResponse.json({ error: "Invalid specialties format" }, { status: 400 })
    }

    const result = await query(
      "UPDATE doctors SET name = ?, position = ?, degree = ?, nmc_number = ?, linkedin_url = ?, specialties = ?, updated_at = NOW() WHERE id = ?",
      [
        name.trim(),
        position.trim(),
        degree.trim(),
        nmcNumber.trim(),
        linkedin.trim() || "",
        JSON.stringify(specialtiesArray),
        id,
      ],
    )

    if ((result as any).affectedRows === 0) {
      return NextResponse.json({ error: "Doctor not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Doctor updated successfully" })
  } catch (error) {
    console.error("Update error:", error)
    return NextResponse.json({ error: "Failed to update doctor" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // Get doctor info before deleting
    const doctors = (await query("SELECT image_url FROM doctors WHERE id = ?", [id])) as any[]

    if (doctors.length === 0) {
      return NextResponse.json({ error: "Doctor not found" }, { status: 404 })
    }

    const doctor = doctors[0]

    // Delete from database
    const result = await query("DELETE FROM doctors WHERE id = ?", [id])

    if ((result as any).affectedRows === 0) {
      return NextResponse.json({ error: "Doctor not found" }, { status: 404 })
    }

    // Delete file
    try {
      const filePath = path.join(process.cwd(), "public", doctor.image_url)
      await unlink(filePath)
    } catch (fileError) {
      console.error("File deletion error:", fileError)
      // Continue even if file deletion fails
    }

    return NextResponse.json({ message: "Doctor deleted successfully" })
  } catch (error) {
    console.error("Delete error:", error)
    return NextResponse.json({ error: "Failed to delete doctor" }, { status: 500 })
  }
}

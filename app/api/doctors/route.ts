import { type NextRequest, NextResponse } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import path from "path"
import { query } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const doctors = await query("SELECT * FROM doctors WHERE is_active = 1")
    return NextResponse.json(doctors)
  } catch (error) {
    console.error("Error fetching doctors:", error)
    return NextResponse.json({ error: "Failed to fetch doctors" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const name = formData.get("name") as string
    const position = formData.get("position") as string
    const degree = formData.get("degree") as string
    const nmcNumber = formData.get("nmcNumber") as string
    const linkedin = formData.get("linkedin") as string
    const specialties = formData.get("specialties") as string
    const file = formData.get("file") as File

    // Validate inputs
    if (!name || !position || !degree || !nmcNumber || !specialties || !file) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Validate file type (only images)
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"]
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Invalid file type. Only images are allowed." }, { status: 400 })
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
    } catch (error) {
      console.error("Invalid specialties format:", specialties, error)
      return NextResponse.json({ error: "Invalid specialties format. Must be a JSON array." }, { status: 400 })
    }

    // Ensure the doctors upload directory exists
    const uploadDir = path.join(process.cwd(), "public", "uploads", "doctors")
    try {
      await mkdir(uploadDir, { recursive: true })
    } catch (mkdirError) {
      console.error("Error creating upload directory:", mkdirError)
      return NextResponse.json({ error: "Failed to create upload directory" }, { status: 500 })
    }

    // Generate unique filename
    const timestamp = Date.now()
    const extension = path.extname(file.name)
    const filename = `${timestamp}-${file.name.replace(/\s/g, "-").toLowerCase()}`
    const filePath = path.join(uploadDir, filename)

    // Save file to public/uploads/doctors
    const buffer = Buffer.from(await file.arrayBuffer())
    await writeFile(filePath, buffer)

    // Save to database
    const src = `/uploads/doctors/${filename}`
    try {
      const result = await query(
        "INSERT INTO doctors (name, position, degree, nmc_number, linkedin_url, image_url, specialties, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())",
        [
          name.trim(),
          position.trim(),
          degree.trim(),
          nmcNumber.trim(),
          linkedin.trim() || "",
          src,
          JSON.stringify(specialtiesArray),
        ],
      )

      return NextResponse.json({ message: "Doctor added successfully", id: (result as any).insertId })
    } catch (dbError: any) {
      console.error("Database error:", {
        message: dbError.message,
        code: dbError.code,
        sql: dbError.sql,
        sqlMessage: dbError.sqlMessage,
      })
      return NextResponse.json({ error: `Database error: ${dbError.sqlMessage || dbError.message}` }, { status: 500 })
    }
  } catch (error) {
    console.error("Error adding doctor:", error)
    return NextResponse.json({ error: "Failed to add doctor" }, { status: 500 })
  }
}

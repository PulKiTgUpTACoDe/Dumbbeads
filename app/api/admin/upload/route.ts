import { NextResponse } from "next/server"
import { requireAdmin, handleApiError } from "@/lib/api-middleware"
import { uploadImage } from "@/lib/cloudinary"

export async function POST(request: Request) {
    const authResult = await requireAdmin()
    if (authResult instanceof NextResponse) return authResult

    try {
        const formData = await request.formData()
        const file = formData.get("file") as File

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 })
        }

        // Validate file type
        const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
        if (!validTypes.includes(file.type)) {
            return NextResponse.json(
                { error: "Invalid file type. Only JPEG, PNG, and WebP are allowed." },
                { status: 400 }
            )
        }

        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            return NextResponse.json(
                { error: "File too large. Maximum size is 10MB." },
                { status: 400 }
            )
        }

        // Convert file to base64
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const base64 = `data:${file.type};base64,${buffer.toString("base64")}`

        // Upload to Cloudinary
        const result = await uploadImage(base64, "dumbbeads")

        return NextResponse.json({
            url: result.url,
            publicId: result.publicId,
            width: result.width,
            height: result.height,
        })
    } catch (error) {
        return handleApiError(error)
    }
}

import { NextResponse } from "next/server"
import { requireAdmin, handleApiError } from "@/lib/api-middleware"
import { prisma } from "@/lib/db"
import { z } from "zod"

const createImageSchema = z.object({
    url: z.string().url(),
    alt: z.string().optional(),
    cloudinaryId: z.string().optional(),
    order: z.number().default(0),
    productId: z.string(),
})

// POST /api/admin/images - Create new image
export async function POST(request: Request) {
    const authResult = await requireAdmin()
    if (authResult instanceof NextResponse) return authResult

    try {
        const body = await request.json()
        const validated = createImageSchema.parse(body)

        const image = await prisma.image.create({
            data: validated,
        })

        return NextResponse.json(image, { status: 201 })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: "Validation error", details: error },
                { status: 400 }
            )
        }
        return handleApiError(error)
    }
}

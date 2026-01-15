import { NextResponse } from "next/server"
import { requireAdmin, handleApiError } from "@/lib/api-middleware"
import { prisma } from "@/lib/db"
import { z } from "zod"

const createProductSchema = z.object({
    name: z.string().min(1).max(255),
    description: z.string().optional(),
    price: z.number().positive(),
    stockUrgency: z.string().optional(),
    collectionId: z.string(),
})

// POST /api/admin/products - Create new product
export async function POST(request: Request) {
    const authResult = await requireAdmin()
    if (authResult instanceof NextResponse) return authResult

    try {
        const body = await request.json()
        const validated = createProductSchema.parse(body)

        const product = await prisma.product.create({
            data: validated,
            include: {
                images: true,
                variants: true,
            },
        })

        return NextResponse.json(product, { status: 201 })
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

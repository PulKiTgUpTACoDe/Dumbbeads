import { NextResponse } from "next/server"
import { requireAdmin, handleApiError } from "@/lib/api-middleware"
import { prisma } from "@/lib/db"
import { z } from "zod"

const updateProductSchema = z.object({
    name: z.string().min(1).max(255).optional(),
    description: z.string().optional(),
    price: z.number().positive().optional(),
    stockUrgency: z.string().optional(),
})

// GET /api/admin/products/[id] - Get single product
export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const authResult = await requireAdmin()
    if (authResult instanceof NextResponse) return authResult

    try {
        const product = await prisma.product.findUnique({
            where: { id: params.id },
            include: {
                images: { orderBy: { order: "asc" } },
                variants: true,
                collection: true,
            },
        })

        if (!product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 })
        }

        return NextResponse.json(product)
    } catch (error) {
        return handleApiError(error)
    }
}

// PATCH /api/admin/products/[id] - Update product
export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
) {
    const authResult = await requireAdmin()
    if (authResult instanceof NextResponse) return authResult

    try {
        const body = await request.json()
        const validated = updateProductSchema.parse(body)

        const product = await prisma.product.update({
            where: { id: params.id },
            data: validated,
            include: {
                images: true,
                variants: true,
            },
        })

        return NextResponse.json(product)
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

// DELETE /api/admin/products/[id] - Delete product
export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    const authResult = await requireAdmin()
    if (authResult instanceof NextResponse) return authResult

    try {
        await prisma.product.delete({
            where: { id: params.id },
        })

        return NextResponse.json({ message: "Product deleted successfully" })
    } catch (error) {
        return handleApiError(error)
    }
}

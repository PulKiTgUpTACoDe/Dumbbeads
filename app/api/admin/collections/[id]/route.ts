import { NextResponse } from "next/server"
import { requireAdmin, handleApiError } from "@/lib/api-middleware"
import { prisma } from "@/lib/db"
import { z } from "zod"

const updateCollectionSchema = z.object({
    name: z.string().min(1).max(255).optional(),
    description: z.string().optional(),
    slug: z.string().min(1).max(255).optional(),
    status: z.enum(["draft", "published"]).optional(),
})

// GET /api/admin/collections/[id] - Get single collection
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const authResult = await requireAdmin()
    if (authResult instanceof NextResponse) return authResult

    try {
        const { id } = await params
        const collection = await prisma.collection.findUnique({
            where: { id },
            include: {
                products: {
                    include: {
                        images: {
                            orderBy: { order: "asc" },
                        },
                        variants: true,
                    },
                },
            },
        })

        if (!collection) {
            return NextResponse.json(
                { error: "Collection not found" },
                { status: 404 }
            )
        }

        return NextResponse.json(collection)
    } catch (error) {
        return handleApiError(error)
    }
}

// PATCH /api/admin/collections/[id] - Update collection
export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const authResult = await requireAdmin()
    if (authResult instanceof NextResponse) return authResult

    try {
        const { id } = await params
        const body = await request.json()
        const validated = updateCollectionSchema.parse(body)

        // Check if collection exists
        const existing = await prisma.collection.findUnique({
            where: { id },
        })

        if (!existing) {
            return NextResponse.json(
                { error: "Collection not found" },
                { status: 404 }
            )
        }

        // If updating slug, check for conflicts
        if (validated.slug && validated.slug !== existing.slug) {
            const slugExists = await prisma.collection.findUnique({
                where: { slug: validated.slug },
            })

            if (slugExists) {
                return NextResponse.json(
                    { error: "Collection with this slug already exists" },
                    { status: 400 }
                )
            }
        }

        const collection = await prisma.collection.update({
            where: { id },
            data: validated,
        })

        return NextResponse.json(collection)
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

// DELETE /api/admin/collections/[id] - Delete collection
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const authResult = await requireAdmin()
    if (authResult instanceof NextResponse) return authResult

    try {
        const { id } = await params
        // Check if collection exists
        const existing = await prisma.collection.findUnique({
            where: { id },
        })

        if (!existing) {
            return NextResponse.json(
                { error: "Collection not found" },
                { status: 404 }
            )
        }

        // Delete collection (will cascade to products, images, variants)
        await prisma.collection.delete({
            where: { id },
        })

        return NextResponse.json({ message: "Collection deleted successfully" })
    } catch (error) {
        return handleApiError(error)
    }
}

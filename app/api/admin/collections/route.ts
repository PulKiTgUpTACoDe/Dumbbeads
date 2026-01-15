import { NextResponse } from "next/server"
import { requireAdmin, handleApiError } from "@/lib/api-middleware"
import { prisma } from "@/lib/db"
import { z } from "zod"

// Validation schema
const createCollectionSchema = z.object({
    name: z.string().min(1).max(255),
    description: z.string().optional(),
    slug: z.string().min(1).max(255),
    status: z.enum(["draft", "published"]).default("draft"),
})

// GET /api/admin/collections - Get all collections
export async function GET() {
    const authResult = await requireAdmin()
    if (authResult instanceof NextResponse) return authResult

    try {
        const collections = await prisma.collection.findMany({
            include: {
                products: {
                    include: {
                        images: {
                            orderBy: { order: "asc" },
                            take: 1,
                        },
                    },
                },
            },
            orderBy: { createdAt: "desc" },
        })

        return NextResponse.json(collections)
    } catch (error) {
        return handleApiError(error)
    }
}

// POST /api/admin/collections - Create new collection
export async function POST(request: Request) {
    const authResult = await requireAdmin()
    if (authResult instanceof NextResponse) return authResult

    try {
        const body = await request.json()
        const validated = createCollectionSchema.parse(body)

        // Check if slug already exists
        const existing = await prisma.collection.findUnique({
            where: { slug: validated.slug },
        })

        if (existing) {
            return NextResponse.json(
                { error: "Collection with this slug already exists" },
                { status: 400 }
            )
        }

        const collection = await prisma.collection.create({
            data: validated,
        })

        return NextResponse.json(collection, { status: 201 })
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

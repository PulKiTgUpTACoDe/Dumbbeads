import { prisma } from "@/lib/db"

/**
 * Get all collections with their products and images
 * @param includeUnpublished - Include draft collections (for admin)
 */
export async function getCollections(includeUnpublished: boolean = false) {
    const where = includeUnpublished ? {} : { status: "published" }

    return prisma.collection.findMany({
        where,
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
        orderBy: { createdAt: "desc" },
    })
}

/**
 * Get published collections only (for public site)
 */
export async function getPublishedCollections() {
    return getCollections(false)
}

/**
 * Get all collections including drafts (for admin)
 */
export async function getAllCollections() {
    return getCollections(true)
}

/**
 * Get single collection by ID
 */
export async function getCollectionById(id: string) {
    return prisma.collection.findUnique({
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
}

/**
 * Get single collection by slug
 */
export async function getCollectionBySlug(slug: string) {
    return prisma.collection.findUnique({
        where: { slug },
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
}

/**
 * Get single product by ID
 */
export async function getProductById(id: string) {
    return prisma.product.findUnique({
        where: { id },
        include: {
            images: {
                orderBy: { order: "asc" },
            },
            variants: true,
            collection: true,
        },
    })
}

import { getPublishedCollections } from "@/lib/queries/collections"

export interface Gallery {
    id: string
    name: string
    description: string
    price: number
    coverImage: string
    images: string[]
    stockUrgency: string | null
    variants: {
        id: string
        name: string
        color: string
        stockCount: number
    }[]
}

/**
 * Get galleries for the public site
 * Now powered by database instead of filesystem
 */
export async function getGalleries(): Promise<Gallery[]> {
    const collections = await getPublishedCollections()

    return collections.map((collection: Awaited<ReturnType<typeof getPublishedCollections>>[number]) => {
        // Get all images from all products in this collection
        const allImages = collection.products.flatMap((product) =>
            product.images.map((img) => img.url)
        )

        // Get first product for pricing and variants
        const firstProduct = collection.products[0]

        return {
            id: collection.slug,
            name: collection.name,
            description: collection.description || `Explore our ${collection.name} collection`,
            price: firstProduct?.price || 99,
            coverImage: allImages[0] || "/images/placeholder.jpg",
            images: allImages,
            stockUrgency: firstProduct?.stockUrgency,
            variants: firstProduct?.variants || [],
        }
    })
}

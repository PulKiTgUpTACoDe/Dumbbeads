export interface ProductVariant {
    id: string;
    name: string;
    color: string;
    stockCount: number;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    images: string[]; // Gallery images
    variants: ProductVariant[];
    stockUrgency?: string;
}

export const products: Product[] = [
    {
        id: "necklace-1",
        name: "Multicolor Beaded Necklace",
        description: "Handcrafted beaded necklace with vibrant colors. Perfect for casual and festive wear.",
        price: 899,
        image: "/images/image1.webp",
        images: [
            "/images/image1.webp",
            "/images/image2.webp",
            "/images/image3.webp",
            "/images/image4.webp",
            "/images/image5.webp",
        ],
        stockUrgency: "Only 3 left!",
        variants: [
            { id: "v1", name: "Rainbow Mix", color: "#FF6B6B", stockCount: 3 },
            { id: "v2", name: "Ocean Blue", color: "#4ECDC4", stockCount: 5 },
            { id: "v3", name: "Sunset Orange", color: "#FF9F1C", stockCount: 2 },
        ],
    },
    {
        id: "necklace-2",
        name: "Minimalist Earth Tone Necklace",
        description: "Elegant beaded necklace in earthy tones. Subtle and sophisticated.",
        price: 1299,
        image: "/images/image6.webp",
        images: [
            "/images/image6.webp",
            "/images/image7.webp",
            "/images/image8.webp",
            "/images/image9.webp",
            "/images/image10.webp",
        ],
        stockUrgency: "Limited stock",
        variants: [
            { id: "v1", name: "Clay Brown", color: "#A67C52", stockCount: 4 },
            { id: "v2", name: "Sage Green", color: "#9CAF88", stockCount: 6 },
            { id: "v3", name: "Stone Grey", color: "#8B8680", stockCount: 3 },
        ],
    },
    {
        id: "bracelet-1",
        name: "Beaded Charm Bracelet",
        description: "Delicate beaded bracelet with small charm. Minimalist and chic.",
        price: 599,
        image: "/images/image11.webp",
        images: [
            "/images/image11.webp",
            "/images/image12.webp",
            "/images/image13.webp",
            "/images/image14.webp",
            "/images/image15.webp",
        ],
        variants: [
            { id: "v1", name: "Rose Gold", color: "#E8B4B8", stockCount: 8 },
            { id: "v2", name: "Silver", color: "#C0C0C0", stockCount: 5 },
            { id: "v3", name: "Gold", color: "#FFD700", stockCount: 4 },
        ],
    },
    {
        id: "bracelet-2",
        name: "Layered Bracelet Set",
        description: "Set of 3 stackable beaded bracelets. Mix and match for your style.",
        price: 799,
        image: "/images/image16.webp",
        images: [
            "/images/image16.webp",
            "/images/image17.webp",
            "/images/image18.webp",
            "/images/image19.webp",
            "/images/image20.webp",
            "/images/image21.webp",
        ],
        stockUrgency: "Best seller!",
        variants: [
            { id: "v1", name: "Pastel Mix", color: "#FFB6D9", stockCount: 7 },
            { id: "v2", name: "Monochrome", color: "#2D3436", stockCount: 6 },
            { id: "v3", name: "Tropical", color: "#00D2D3", stockCount: 5 },
        ],
    },
];

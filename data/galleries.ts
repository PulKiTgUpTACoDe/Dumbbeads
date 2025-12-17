import fs from "fs";
import path from "path";

export interface Gallery {
    id: string;
    name: string;
    description: string;
    price: number;
    coverImage: string;
    images: string[];
    stockUrgency?: string;
    variants: {
        id: string;
        name: string;
        color: string;
        stockCount: number;
    }[];
}

interface GalleryMetadata {
    name?: string;
    description?: string;
    price?: number;
    stockUrgency?: string;
    variants?: {
        id: string;
        name: string;
        color: string;
        stockCount: number;
    }[];
}

// Default variants if not specified
const DEFAULT_VARIANTS = [
    { id: "v1", name: "Rainbow Mix", color: "#FF6B6B", stockCount: 5 },
    { id: "v2", name: "Ocean Blue", color: "#4ECDC4", stockCount: 7 },
    { id: "v3", name: "Sunset Orange", color: "#FF9F1C", stockCount: 4 },
];

export function getGalleries(): Gallery[] {
    const imagesDirectory = path.join(process.cwd(), "public", "images");

    // Check if directory exists
    if (!fs.existsSync(imagesDirectory)) {
        console.warn("Images directory not found:", imagesDirectory);
        return [];
    }

    // Get all directories in the images folder
    const galleryFolders = fs
        .readdirSync(imagesDirectory, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name)
        .sort();

    const galleries: Gallery[] = galleryFolders.map((folderName, index) => {
        const galleryPath = path.join(imagesDirectory, folderName);

        // Get all image files in this gallery folder
        const imageFiles = fs
            .readdirSync(galleryPath)
            .filter((file) => /\.(webp|jpg|jpeg|png)$/i.test(file))
            .sort()
            .map((file) => `/images/${folderName}/${file}`);

        // Use first image as cover
        const coverImage = imageFiles[0] || "/images/placeholder.jpg";

        // Try to read optional gallery.json for custom metadata
        let metadata: GalleryMetadata = {};
        const metadataPath = path.join(galleryPath, "gallery.json");

        if (fs.existsSync(metadataPath)) {
            try {
                const metadataContent = fs.readFileSync(metadataPath, "utf-8");
                metadata = JSON.parse(metadataContent);
            } catch (error) {
                console.warn(`Failed to parse gallery.json for ${folderName}:`, error);
            }
        }

        // Generate gallery name from folder name if not provided
        const defaultName = folderName
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");

        // Create gallery object with metadata or defaults
        return {
            id: folderName,
            name: metadata.name || defaultName,
            description:
                metadata.description ||
                `Beautiful handcrafted jewelry collection featuring ${imageFiles.length} unique pieces.`,
            price: metadata.price || 899 + index * 200,
            coverImage,
            images: imageFiles,
            stockUrgency: metadata.stockUrgency,
            variants: metadata.variants || DEFAULT_VARIANTS,
        };
    });

    return galleries;
}

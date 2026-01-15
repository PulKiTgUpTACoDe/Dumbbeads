import fs from "fs"
import path from "path"
import { prisma } from "../lib/db"
import { uploadImage } from "../lib/cloudinary"

/**
 * Script to migrate existing filesystem-based galleries to database
 * Run with: npx tsx scripts/migrate-galleries.ts
 */

async function migrateGalleries() {
    const imagesDirectory = path.join(process.cwd(), "public", "images")

    if (!fs.existsSync(imagesDirectory)) {
        console.log("❌ Images directory not found!")
        return
    }

    console.log("🚀 Starting gallery migration...")

    try {
        // Get all gallery folders
        const galleryFolders = fs
            .readdirSync(imagesDirectory, { withFileTypes: true })
            .filter((dirent) => dirent.isDirectory())
            .map((dirent) => dirent.name)
            .sort()

        console.log(`📁 Found ${galleryFolders.length} galleries to migrate\n`)

        for (const folderName of galleryFolders) {
            console.log(`\n📦 Processing: ${folderName}`)
            const galleryPath = path.join(imagesDirectory, folderName)

            // Read metadata if exists
            let metadata: any = {}
            const metadataPath = path.join(galleryPath, "gallery.json")
            if (fs.existsSync(metadataPath)) {
                try {
                    metadata = JSON.parse(fs.readFileSync(metadataPath, "utf-8"))
                    console.log(`   ℹ️  Found metadata file`)
                } catch (error) {
                    console.warn(`   ⚠️  Could not parse gallery.json`)
                }
            }

            // Generate name and slug
            const defaultName = folderName
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")

            const name = metadata.name || defaultName
            const slug = folderName

            // Check if collection already exists
            const existingCollection = await prisma.collection.findUnique({
                where: { slug },
            })

            let collection
            if (existingCollection) {
                console.log(`   ⏭️  Collection already exists, skipping...`)
                continue
            }

            // Create collection
            collection = await prisma.collection.create({
                data: {
                    name,
                    slug,
                    description: metadata.description || `Explore our ${name} collection`,
                    status: "published",
                },
            })
            console.log(`   ✅ Created collection: ${name}`)

            // Get all image files
            const imageFiles = fs
                .readdirSync(galleryPath)
                .filter((file) => /\.(webp|jpg|jpeg|png)$/i.test(file))
                .sort()

            if (imageFiles.length === 0) {
                console.log(`   ⚠️  No images found, skipping...`)
                continue
            }

            console.log(`   📸 Uploading ${imageFiles.length} images to Cloudinary...`)

            // Create a product to hold the images
            const product = await prisma.product.create({
                data: {
                    name,
                    description: metadata.description || `Beautiful ${name} jewelry`,
                    price: metadata.price || 99,
                    stockUrgency: metadata.stockUrgency,
                    collectionId: collection.id,
                },
            })

            // Upload images to Cloudinary and create database records
            for (let i = 0; i < imageFiles.length; i++) {
                const filename = imageFiles[i]
                const localPath = path.join(galleryPath, filename)

                try {
                    // Read file and convert to base64
                    const fileBuffer = fs.readFileSync(localPath)
                    const base64 = `data:image/jpeg;base64,${fileBuffer.toString("base64")}`

                    // Upload to Cloudinary
                    const cloudinaryResult = await uploadImage(base64, `dumbbeads/${slug}`)

                    // Create image record
                    await prisma.image.create({
                        data: {
                            url: cloudinaryResult.url,
                            cloudinaryId: cloudinaryResult.publicId,
                            order: i,
                            productId: product.id,
                            alt: `${name} - Image ${i + 1}`,
                        },
                    })

                    console.log(`   ✅ Uploaded: ${filename}`)
                } catch (error) {
                    console.error(`   ❌ Failed to upload ${filename}:`, error)
                }
            }

            // Create variants if they exist
            if (metadata.variants && Array.isArray(metadata.variants)) {
                for (const variant of metadata.variants) {
                    await prisma.variant.create({
                        data: {
                            name: variant.name,
                            color: variant.color,
                            stockCount: variant.stockCount || 0,
                            productId: product.id,
                        },
                    })
                }
                console.log(`   ✅ Created ${metadata.variants.length} variants`)
            }

            console.log(`   🎉 Successfully migrated: ${name}`)
        }

        console.log("\n\n✨ Migration complete!")
        console.log("🔍 You can now view your collections at /admin/collections")
    } catch (error) {
        console.error("\n❌ Migration failed:", error)
        throw error
    } finally {
        await prisma.$disconnect()
    }
}

migrateGalleries()

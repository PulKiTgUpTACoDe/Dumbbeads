import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

/**
 * Upload image to Cloudinary
 * @param file - File buffer or base64 string
 * @param folder - Cloudinary folder path (default: 'dumbbeads')
 * @returns Upload result with URL and public_id
 */
export async function uploadImage(
    file: string,
    folder: string = 'dumbbeads'
) {
    try {
        const result = await cloudinary.uploader.upload(file, {
            folder,
            resource_type: 'auto',
            transformation: [
                { quality: 'auto', fetch_format: 'auto' }
            ]
        })

        return {
            url: result.secure_url,
            publicId: result.public_id,
            width: result.width,
            height: result.height,
        }
    } catch (error) {
        console.error('Cloudinary upload error:', error)
        throw new Error('Failed to upload image')
    }
}

/**
 * Delete image from Cloudinary
 * @param publicId - Cloudinary public_id
 */
export async function deleteImage(publicId: string) {
    try {
        const result = await cloudinary.uploader.destroy(publicId)
        return result
    } catch (error) {
        console.error('Cloudinary delete error:', error)
        throw new Error('Failed to delete image')
    }
}

/**
 * Get optimized image URL with transformations
 * @param publicId - Cloudinary public_id
 * @param width - Optional width
 * @param height - Optional height
 */
export function getOptimizedImageUrl(
    publicId: string,
    width?: number,
    height?: number
) {
    const transformations = []

    if (width) transformations.push({ width })
    if (height) transformations.push({ height })

    transformations.push({ quality: 'auto', fetch_format: 'auto' })

    return cloudinary.url(publicId, {
        transformation: transformations
    })
}

export default cloudinary

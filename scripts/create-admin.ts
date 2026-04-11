import "dotenv/config"
import { prisma } from "../lib/db"
import { hashPassword } from "../lib/auth"

/**
 * Script to create an initial admin user
 * Run with: npx tsx scripts/create-admin.ts
 */

async function createAdmin() {
    const email = process.env.ADMIN_EMAIL || ""
    const password = process.env.ADMIN_PASSWORD || ""

    try {
        // Check if user already exists
        const existing = await prisma.user.findUnique({
            where: { email },
        })

        if (existing) {
            console.log(`Admin user with email ${email} already exists!`)
            return
        }

        // Create admin user
        const hashedPassword = await hashPassword(password)
        await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name: "Admin",
                role: "admin",
            },
        })

        console.log("✅ Admin user created successfully!")
        console.log("📧 Email:", email)
        console.log("🔑 Password:", password)
        console.log("\n⚠️  Please change the password after first login!")
    } catch (error) {
        console.error("❌ Error creating admin user:", error)
        throw error
    } finally {
        await prisma.$disconnect()
    }
}

createAdmin()

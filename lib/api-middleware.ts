import { auth } from "@/auth"
import { NextResponse } from "next/server"

/**
 * Middleware to check if user is authenticated
 * Use in API routes to ensure only authenticated users can access
 */
export async function requireAuth() {
    const session = await auth()

    if (!session || !session.user) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        )
    }

    return { session }
}

/**
 * Middleware to check if user is admin
 */
export async function requireAdmin() {
    const authResult = await requireAuth()

    if (authResult instanceof NextResponse) {
        return authResult
    }

    const { session } = authResult

    if (session.user.role !== "admin") {
        return NextResponse.json(
            { error: "Forbidden - Admin access required" },
            { status: 403 }
        )
    }

    return { session }
}

/**
 * Handle errors in API routes
 */
export function handleApiError(error: any) {
    console.error("API Error:", error)

    return NextResponse.json(
        {
            error: error.message || "Internal server error",
            details: process.env.NODE_ENV === "development" ? error.stack : undefined
        },
        { status: 500 }
    )
}

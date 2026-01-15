import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
    const { pathname } = req.nextUrl
    const isLoggedIn = !!req.auth

    // Protect all /admin routes except /admin/login
    if (pathname.startsWith("/admin")) {
        if (!isLoggedIn && pathname !== "/admin/login") {
            return NextResponse.redirect(new URL("/admin/login", req.url))
        }

        // Redirect to dashboard if already logged in and trying to access login
        if (isLoggedIn && pathname === "/admin/login") {
            return NextResponse.redirect(new URL("/admin/dashboard", req.url))
        }
    }

    return NextResponse.next()
})

export const config = {
    matcher: ["/admin/:path*"],
}

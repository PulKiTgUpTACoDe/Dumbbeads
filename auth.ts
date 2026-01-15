import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { prisma } from "@/lib/db"
import { verifyPassword } from "@/lib/auth"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                console.log('🔐 [AUTH] Authorization attempt started')
                console.log('📧 [AUTH] Email:', credentials?.email)

                if (!credentials?.email || !credentials?.password) {
                    console.log('❌ [AUTH] Missing credentials')
                    return null
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email as string },
                })

                if (!user) {
                    console.log('❌ [AUTH] User not found:', credentials.email)
                    return null
                }

                console.log('✅ [AUTH] User found:', user.email)
                console.log('🔑 [AUTH] Stored hash:', user.password?.substring(0, 10) + '...')

                const isValidPassword = await verifyPassword(
                    credentials.password as string,
                    user.password
                )

                console.log('🔐 [AUTH] Password validation result:', isValidPassword)

                if (!isValidPassword) {
                    console.log('❌ [AUTH] Invalid password')
                    return null
                }

                console.log('✅ [AUTH] Login successful for:', user.email)
                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                }
            },
        }),
    ],
    pages: {
        signIn: "/admin/login",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.role = (user as any).role
            }
            return token
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id as string
                session.user.role = token.role as string
            }
            return session
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
})

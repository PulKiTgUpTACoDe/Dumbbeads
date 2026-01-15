import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as {
    prisma?: PrismaClient;
};

// PostgreSQL connection pool (required for Supabase)
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 10, // Connection pool size
    ssl: { rejectUnauthorized: false }
});

const adapter = new PrismaPg(pool);

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
});

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}

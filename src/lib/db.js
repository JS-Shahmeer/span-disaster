import "server-only";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;

// null when no database is configured, so the public site can still build and
// render from the bundled content in src/data.
export const prisma = process.env.DATABASE_URL
  ? (globalForPrisma.prisma ??= new PrismaClient())
  : null;

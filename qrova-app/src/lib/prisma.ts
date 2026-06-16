import { neon } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@/src/generated/prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createPrismaClient() {
  const sql = neon(process.env.DATABASE_URL!);
  // neon() returns a NeonQueryFunction which is not directly compatible
  // with the PoolConfig type expected by PrismaNeon, so cast to any.
  // Cast to any to satisfy PrismaNeon constructor typing for the NeonQueryFunction
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const adapter = new PrismaNeon(sql as any);
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

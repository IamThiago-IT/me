import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../../prisma/generated/services/client";

const globalForServicesPrisma = globalThis as unknown as { servicesPrisma: PrismaClient | undefined };

function createServicesClient() {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
  return new PrismaClient({ adapter });
}

export const prisma = globalForServicesPrisma.servicesPrisma ?? createServicesClient();

if (process.env.NODE_ENV !== "production") globalForServicesPrisma.servicesPrisma = prisma;

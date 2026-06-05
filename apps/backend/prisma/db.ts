import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const createAdapter = (): PrismaLibSql => {
  // Default to local SQLite file when DATABASE_URL absent (dev convenience).
  const url = process.env.DATABASE_URL ?? "file:./dev.db";

  // Local dev: file:./dev.db
  if (url.startsWith("file:")) {
    return new PrismaLibSql({ url });
  }

  // Turso remote: DATABASE_URL="libsql://your-db.turso.io"
  const authToken = process.env.TURSO_AUTH_TOKEN;
  if (!authToken) {
    throw new Error("TURSO_AUTH_TOKEN wajib di-set untuk koneksi Turso remote");
  }

  return new PrismaLibSql({ url, authToken });
};

let prisma: PrismaClient | undefined;

export const getPrisma = (): PrismaClient => {
  if (!prisma) {
    prisma = new PrismaClient({ adapter: createAdapter() });
  }
  return prisma;
};

export const disconnectPrisma = async (): Promise<void> => {
  await prisma?.$disconnect();
  prisma = undefined;
};
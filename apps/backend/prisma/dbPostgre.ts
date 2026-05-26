// AWS Lambda tidak bisa langsung menggunakan file SQLite, jadi kita buat file baru khusus untuk PostgreSQL yang akan digunakan di Lambda.
// File ini akan tetap menggunakan Prisma Client dengan skema PostgreSQL.
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

let prisma: PrismaClient;

export const getPrisma = () => {
  if (!prisma) {
    prisma = new PrismaClient({
      adapter: new PrismaPg({
        connectionString: process.env.DATABASE_URL!,
        ssl: {
          rejectUnauthorized: false,
        },
      }),
    });
  }
  return prisma;
};

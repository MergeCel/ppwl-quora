import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import fs from "fs";
import path from "path";

const createAdapter = (): PrismaPg => {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL wajib di-set");
  }

  const certPath = path.join(process.cwd(), "cert/global-bundle.pem");

  if (!fs.existsSync(certPath)) {
    throw new Error(`RDS SSL cert not found at: ${certPath}`);
  }

  return new PrismaPg({
    connectionString,
    ssl: {
      ca: fs.readFileSync(certPath).toString(),
      rejectUnauthorized: true,
    },
  });
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
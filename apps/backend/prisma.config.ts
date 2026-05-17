import { defineConfig } from "prisma/config";
import { resolve } from "path";
import { existsSync, readFileSync } from "fs";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env.DATABASE_URL,
  },
});

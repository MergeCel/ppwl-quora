import { resolve } from "path"
import { existsSync, readFileSync } from "fs"
import { defineConfig } from "prisma/config";

const envPath = resolve(process.cwd(), ".env");
if (!process.env.DATABASE_URL && existsSync(envPath)) {
  try {
    const content = readFileSync(envPath, "utf-8");
    for (const line of content.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const idx = trimmed.indexOf("=");
      if (idx === -1) continue;
      let key = trimmed.slice(0, idx).trim();
      let val = trimmed.slice(idx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      if (!process.env[key]) process.env[key] = val;
    }
  } catch (e) {
    // ignore
  }
}

if (process.env.DATABASE_URL) {
  let raw = process.env.DATABASE_URL.trim();
  if ((raw.startsWith('"') && raw.endsWith('"')) || (raw.startsWith("'") && raw.endsWith("'"))) {
    raw = raw.slice(1, -1);
    process.env.DATABASE_URL = raw;
  }
}

try {
  const dbg = process.env.DATABASE_URL || "";
  console.log("[prisma.config] DATABASE_URL preview:", dbg.slice(0, 200));
  console.log("[prisma.config] DATABASE_URL length:", dbg.length);
  console.log("[prisma.config] DATABASE_URL char codes (first 40):", dbg.split("").slice(0,40).map(c => c.charCodeAt(0)));
} catch (e) {}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: "postgresql://postgres:ppwl-tubes@quora-db.cy9qaey8u3kn.us-east-1.rds.amazonaws.com:5432/postgres?sslmode=require",
  },
});
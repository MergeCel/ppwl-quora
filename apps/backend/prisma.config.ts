import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: "postgresql://postgres:ppwl-tubes@quora-db.cy9qaey8u3kn.us-east-1.rds.amazonaws.com:5432/postgres?sslmode=require",
  },
});

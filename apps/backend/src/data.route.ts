import { Elysia } from "elysia";
import type { DbClient } from "../types";

export const dataRoutes = (getPrisma: () => DbClient) => {
  return new Elysia({ prefix: "/data" })
    // Middleware untuk mengecek API Key
    .beforeHandle(({ query, set }: any) => {
      if (query.key !== process.env.SECRET_KEY) {
        set.status = 403;
        return { message: "Forbidden: Invalid API Key" };
      }
    })
    // GET /data/users -> Mengambil isi tabel user
    .get("/users", async () => {
      const users = await getPrisma().user.findMany({
        select: {
          id: true,
          name: true,
          username: true,
          email: true,
          provider: true,
          created_at: true
        }
      });
      return { data: users, message: "User list retrieved from Database" };
    });
};
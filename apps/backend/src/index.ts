import { postRoutes } from "./post";
import { Elysia } from "elysia";
import { cookie } from "@elysiajs/cookie";
import { notificationRoutes } from "./notification";
import { jwt } from "@elysiajs/jwt";
import { authRoutes } from "./auth"; 
import type { ApiResponse, HealthCheck } from "shared";
import type { DbClient } from "./types";
import { uploadRoutes } from "./upload";

const makeAuthMiddleware =
  (jwtInstance: any) =>
  async ({ headers, set }: any) => {
    const authHeader = headers.authorization;
    if (!authHeader) {
      set.status = 401;
      return null;
    }
    const token = authHeader.replace("Bearer ", "");
    const payload = await jwtInstance.verify(token);
    if (!payload) {
      set.status = 401;
      return null;
    }
    return payload;
  };

export const createApp = (getPrisma: () => DbClient) => {
  const app = new Elysia()
    .use(cookie())
    .use(
      jwt({
        name: "jwt",
        secret: process.env.JWT_SECRET!,
        exp: "1d",
      }),
    )

    .use(postRoutes(getPrisma))
    .use(authRoutes) // pakai authRoutes dari auth.ts
    .use(notificationRoutes(getPrisma)) // pakai notificationRoutes dari notification.ts
    .use(uploadRoutes)

    .get("/", (): ApiResponse<HealthCheck> => ({
      data: { status: "ok" },
      message: "server running",
    }))

    .get("/debug", async () => {
      try {
        const userCount = await getPrisma().user.count();
        const sample = await getPrisma().user.findFirst();
        return {
          status: "ok",
          database: {
            type: "PostgreSQL AWS RDS",
            connected: true,
            userCount,
            sampleUser: sample || null,
          },
          timestamp: new Date().toISOString(),
        };
      } catch (error) {
        return {
          status: "error",
          database: {
            type: "PostgreSQL AWS RDS",
            connected: false,
            error: error instanceof Error ? error.message : String(error),
          },
        };
      }
    })

    .get("/users", async ({ query, set }: any) => {
      if (query.key !== process.env.SECRET_KEY) {
        set.status = 403;
        return { message: "Forbidden" };
      }
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
      return { data: users, message: "User list retrieved" };
    })

    .get("/notifications", async () => {
      try {
        const notifications = await getPrisma().notification.findMany({
          orderBy: { created_at: "desc" },
          take: 10
        });

        if (notifications.length === 0) {
          return {
            data: [
              { id: 1, type: "like", content: "Sheren menyukai postingan Anda tentang AWS RDS", is_read: false, created_at: new Date() },
              { id: 2, type: "comment", content: "Cello mengomentari draf MVC Docker Anda", is_read: true, created_at: new Date() },
              { id: 3, type: "system", content: "Selamat! Akun Qarou Anda berhasil dimigrasi ke Postgres", is_read: false, created_at: new Date() }
            ],
            message: "Mock notifications returned successfully"
          };
        }

        return { data: notifications, message: "Notification list retrieved from AWS RDS" };
      } catch (error) {
        return {
          data: [
            { id: 1, type: "system", content: "Gagal terhubung ke DB, menggunakan fallback lokal.", is_read: false, created_at: new Date() }
          ],
          message: "Fallback load"
        };
      }
    })

    .get("/seed", async ({ query, set }: any) => {
      if (query.key !== process.env.SECRET_KEY) {
        set.status = 403;
        return { message: "Forbidden" };
      }

      await getPrisma().post.createMany({
        data: [
          { user_id: 1, content: "Apa pendapat kalian soal AI di 2026?" },
          { user_id: 1, content: "Tips belajar pemrograman dari nol" }
        ]
      });

      return { message: "Dummy data berhasil dibuat" };
    })

    .get("/auth/me", async ({ headers, jwt, set }) => {
      const auth = makeAuthMiddleware(jwt);
      const user = await auth({ headers, set });
      if (!user) return { loggedIn: false };
      return { loggedIn: true, user };
    });

  return app;
};
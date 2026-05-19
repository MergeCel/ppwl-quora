import { postRoutes } from "./post";
import { Elysia } from "elysia";
import { cookie } from "@elysiajs/cookie";
import { jwt } from "@elysiajs/jwt";
import { cors } from "@elysiajs/cors";
import { createOAuthClient, getAuthUrl } from "./auth";
import { dataRoutes } from "./routes/data.route"; // 👈 IMPORT ROUTE DATA BARU
import type { ApiResponse, HealthCheck, User } from "shared";
import type { DbClient } from "./types";
import bcrypt from "bcryptjs"

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
    .use(cors())
    .use(cookie())
    .use(
      jwt({
        name: "jwt",
        secret: process.env.JWT_SECRET!,
        exp: "1d",
      }),
    )

    .use(postRoutes(getPrisma))
    .use(dataRoutes(getPrisma)) // 👈 GUNAKAN ROUTE DATA DI SINI

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

    // ===============================
    // POST /auth/register
    // ===============================
    .post("/auth/register", async ({ body, set }: any) => {
      const { name, email, password, username } = body

      const existing = await getPrisma().user.findUnique({ where: { email } })
      if (existing) {
        set.status = 400
        return { message: "Email sudah terdaftar" }
      }

      const hashed = await bcrypt.hash(password, 10)

      const user = await getPrisma().user.create({
        data: {
          name,
          username: username || email.split("@")[0],
          email,
          password: hashed,
          provider: "email"
        }
      })

      set.status = 201
      return { message: "Register berhasil", user }
    })

    // ===============================
    // POST /auth/login (email)
    // ===============================
    .post("/auth/login", async ({ body, set, jwt }: any) => {
      const { email, password } = body

      const user = await getPrisma().user.findUnique({ where: { email } })
      if (!user) {
        set.status = 404
        return { message: "User tidak ditemukan" }
      }

      const valid = await bcrypt.compare(password, user.password!)
      if (!valid) {
        set.status = 401
        return { message: "Password salah" }
      }

      const token = await jwt.sign({ id: user.id.toString() })

      return {
        user: {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
          avatarUrl: user.avatar_url
        },
        accessToken: token
      }
    })

    // ===============================
    // GET /seed?key= (dummy data)
    // ===============================
    .get("/seed", async ({ query, set }: any) => {
      if (query.key !== process.env.SECRET_KEY) {
        set.status = 403
        return { message: "Forbidden" }
      }

      await getPrisma().post.createMany({
        data: [
          { user_id: 1, content: "Apa pendapat kalian soal AI di 2026?" },
          { user_id: 1, content: "Tips belajar pemrograman dari nol" }
        ]
      })

      return { message: "Dummy data berhasil dibuat" }
    })

    // ===============================
    // ROUTE LAMA — BIARKAN
    // ===============================
    .get("/auth/google", ({ redirect }) => {
      const oauth2Client = createOAuthClient();
      const url = getAuthUrl(oauth2Client);
      return redirect(url);
    })

    .get("/auth/callback", async ({ query, jwt, redirect }) => {
      const { code } = query as any;
      const oauth2Client = createOAuthClient();
      const { tokens } = await oauth2Client.getToken(code);
      const token = await jwt.sign({
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
      });
      return redirect(`${process.env.FRONTEND_URL}/home?token=${token}`);
    })

    .get("/auth/me", async ({ headers, jwt, set }) => {
      const auth = makeAuthMiddleware(jwt);
      const user = await auth({ headers, set });
      if (!user) return { loggedIn: false };
      return { loggedIn: true, user };
    });

  return app;
};
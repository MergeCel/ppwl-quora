import { Elysia } from "elysia";
import { cookie } from "@elysiajs/cookie";
import { jwt } from "@elysiajs/jwt";
import { cors } from "@elysiajs/cors";
import { createOAuthClient, getAuthUrl } from "./auth";
import { getCourses, getCourseWorks, getSubmissions } from "./classroom";
import type { ApiResponse, HealthCheck, User } from "shared";
import type { DbClient } from "./types";
import bcrypt from "bcryptjs"  // ← TAMBAH INI

export const createApp = (getPrisma: () => DbClient) => {
  const app = new Elysia()
    .use(cors())
    .use(cookie())
    .use(
      jwt({
        name: "jwt",
        secret: process.env.JWT_SECRET!,
        exp: "1d",
      })
    )

    // Health check — BIARKAN
    .get("/", (): ApiResponse<HealthCheck> => ({
      data: { status: "ok" },
      message: "server running",
    }))

    // Debug — BIARKAN
    .get("/debug", async () => {
      // ... isi lama biarkan
    })

    // =============================
    // TAMBAHKAN ROUTE BARU DI SINI
    // =============================

    // GET /users?key=secret (wajib modul)
    .get("/users", async ({ query, set }) => {
      if (query.key !== process.env.SECRET_KEY) {
        set.status = 403
        return { message: "Forbidden" }
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
      })
      return { data: users, message: "User list retrieved" }
    })

    // POST /auth/register
    .post("/auth/register", async ({ body, set }: any) => {
      try {
        console.log("[debug] POST /auth/register headers/body:", { body })
        const { name, username, email, password } = body

        const existing = await getPrisma().user.findUnique({ where: { email } })
      if (existing) {
        set.status = 400
        return { message: "Email sudah terdaftar" }
      }

      const hashed = await bcrypt.hash(password, 10)

      const user = await getPrisma().user.create({
        data: {
          name,
          username,
          email,
          password: hashed,
          provider: "email"
        }
      })
      set.status = 201
      return { message: "Register berhasil", user }
      } catch (err) {
        console.error('[debug] /auth/register error', err)
        set.status = 500
        return { message: 'Server error', detail: err instanceof Error ? err.message : String(err) }
      }
    })

    // POST /auth/login
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

    // GET /seed?key= (dummy data, hapus setelah testing)
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

    // =============================
    // ROUTE LAMA — BIARKAN SEMUA
    // =============================
    .get("/auth/login", ({ redirect }) => {
      const oauth2Client = createOAuthClient();
      const url = getAuthUrl(oauth2Client);
      return redirect(url);
    })

  return app;
};
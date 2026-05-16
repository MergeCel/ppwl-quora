import Elysia, { t } from "elysia"
import { getPrisma } from "../prisma/dbPostgre"
import { google } from "googleapis"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

// OAuth helper: buat OAuth2 client yang dikonfigurasi dari env
export function createOAuthClient() {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );
}

export function getAuthUrl(oauth2Client: any) {
  return oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/classroom.courses.readonly",
      "https://www.googleapis.com/auth/classroom.coursework.me",
      "profile",
      "email",
    ],
  });
}

export const authRoutes = new Elysia({ prefix: "/auth" })

  // =============================
  // POST /auth/register
  // =============================
  .post("/register", async ({ body, set }) => {
    const { name, username, email, password } = body

    // Cek email sudah ada
    const existing = await getPrisma().user.findUnique({ where: { email } })
    if (existing) {
      set.status = 400
      return { message: "Email sudah terdaftar" }
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10)

    // Simpan ke DB
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
    return {
      message: "Register berhasil",
      user: {
        id: user.id.toString(),
        name: user.name,
        username: user.username,
        email: user.email,
        avatarUrl: user.avatar_url,
        provider: user.provider
      }
    }
  }, {
    body: t.Object({
      name: t.String(),
      username: t.String(),
      email: t.String(),
      password: t.String()
    })
  })

  // =============================
  // POST /auth/login
  // =============================
  .post("/login", async ({ body, set }) => {
    const { email, password } = body

    // Cari user
    const user = await getPrisma().user.findUnique({ where: { email } })
    // Untuk menghindari user enumeration, gunakan pesan dan status yang sama
    // untuk kasus user tidak ditemukan, akun tanpa password, atau password salah.
    if (!user) {
      set.status = 401
      return { message: "Email atau password salah" }
    }

    // Pastikan akun memiliki password (bisa jadi akun OAuth tanpa password)
    if (!user.password) {
      set.status = 401
      return { message: "Email atau password salah" }
    }

    // Cek password
    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      set.status = 401
      return { message: "Email atau password salah" }
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id.toString() },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    )

    return {
      user: {
        id: user.id.toString(),
        name: user.name,
        email: user.email,
        avatarUrl: user.avatar_url
      },
      accessToken: token
    }
  }, {
    body: t.Object({
      email: t.String(),
      password: t.String()
    })
  })
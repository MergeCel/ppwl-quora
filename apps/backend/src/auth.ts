import Elysia, { t } from "elysia"
import { getPrisma } from "../prisma/dbPostgre"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const authRoutes = new Elysia({ prefix: "/auth" })

  // =============================
  // POST /auth/register
  // =============================
  .post("/register", async ({ body, set }) => {
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

    const user = await getPrisma().user.findUnique({ where: { email } })
    if (!user) {
      set.status = 401
      return { message: "Email atau password salah" }
    }

    if (!user.password) {
      set.status = 401
      return { message: "Email atau password salah" }
    }

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      set.status = 401
      return { message: "Email atau password salah" }
    }

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

  // =============================
  // POST /auth/google
  // Menerima access_token dari frontend (implicit flow)
  // =============================
  .post("/google", async ({ body, set }) => {
    const { access_token } = body

    try {
      // Verifikasi access_token ke Google API
      const resG = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: { Authorization: `Bearer ${access_token}` }
      })
      const googleUser: any = await resG.json()

      if (!googleUser.email) {
        set.status = 400
        return { message: "Invalid Google Token" }
      }

      // Cari atau buat user
      let user = await getPrisma().user.findUnique({ where: { email: googleUser.email } })
      if (!user) {
        user = await getPrisma().user.create({
          data: {
            name: googleUser.name || "",
            username: googleUser.email.split("@")[0] + Math.floor(Math.random() * 1000),
            email: googleUser.email,
            avatar_url: googleUser.picture || null,
            provider: "google",
            provider_id: googleUser.sub || null
          }
        })
      } else if (!user.provider_id) {
        await getPrisma().user.update({
          where: { id: user.id },
          data: { provider: "google", provider_id: googleUser.sub }
        })
      }

      const token = jwt.sign(
        { id: user.id.toString() },
        process.env.JWT_SECRET!,
        { expiresIn: "7d" }
      )

      return {
        accessToken: token,
        user: {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
          avatarUrl: user.avatar_url
        }
      }
    } catch (err) {
      set.status = 500
      return { message: err instanceof Error ? err.message : String(err) }
    }
  }, {
    body: t.Object({
      access_token: t.String()
    })
  })
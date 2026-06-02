import Elysia, { t } from "elysia"
import { getPrisma } from "../prisma/dbPostgre"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const authRoutes = new Elysia({ prefix: "/auth" })

  .post("/register", async ({ body, set }) => {
    const { name, username, email, password } = body

    const existing = await getPrisma().user.findUnique({ where: { email } })
    if (existing) {
      set.status = 400
      return { message: "Email sudah terdaftar" }
    }

    const hashed = await bcrypt.hash(password, 10)

    const user = await getPrisma().user.create({
      data: { name, username, email, password: hashed, provider: "email" }
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

  .post("/google", async ({ body, set }) => {
    const { access_token } = body

    try {
      const resG = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: { Authorization: `Bearer ${access_token}` }
      })
      const googleUser: any = await resG.json()

      if (!googleUser.email) {
        set.status = 400
        return { message: "Invalid Google Token" }
      }

      let user = await getPrisma().user.findUnique({ where: { email: googleUser.email } })
      if (!user) {
        user = await getPrisma().user.create({
          data: {
            name: googleUser.name || "",
            username: googleUser.email.split("@")[0] + Math.floor(Math.random() * 1000),
            email: googleUser.email,
            avatar_url: googleUser.picture ? googleUser.picture.replace(/=s\d+-c$/, '=s200-c') : null,
            provider: "google",
            provider_id: googleUser.sub || null
          }
        })
      } else {
        await getPrisma().user.update({
          where: { id: user.id },
          data: {
            avatar_url: googleUser.picture ? googleUser.picture.replace(/=s\d+-c$/, '=s200-c') : user.avatar_url,
            provider: "google",
            provider_id: googleUser.sub || user.provider_id
          }
        })
        user = await getPrisma().user.findUnique({ where: { id: user.id } }) as any
      }

      const token = jwt.sign(
        { id: user!.id.toString() },
        process.env.JWT_SECRET!,
        { expiresIn: "7d" }
      )

      return {
        accessToken: token,
        user: {
          id: user!.id.toString(),
          name: user!.name,
          email: user!.email,
          avatarUrl: user!.avatar_url
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

  // =============================
  // PATCH /auth/profile/avatar
  // Update avatar dari halaman profile
  // =============================
  .patch("/profile/avatar", async ({ body, headers, set }) => {
    // Verifikasi JWT dari header
    const authHeader = headers.authorization
    if (!authHeader) {
      set.status = 401
      return { message: "Unauthorized" }
    }

    const token = authHeader.replace("Bearer ", "")
    let userId: string
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET!) as any
      userId = payload.id
    } catch {
      set.status = 401
      return { message: "Token tidak valid" }
    }

    const { avatar_url } = body

    try {
      const user = await getPrisma().user.update({
        where: { id: Number(userId) },
        data: { avatar_url }
      })

      return {
        message: "Avatar berhasil diupdate",
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
      avatar_url: t.String()
    })
  })

  .patch("/profile/name", async ({ body, headers, set }) => {
    const authHeader = headers.authorization;

    if (!authHeader) {
      set.status = 401;
      return { message: "Unauthorized" };
    }

    const token = authHeader.replace("Bearer ", "");

    let userId: string;

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET!) as any;
      userId = payload.id;
    } catch {
      set.status = 401;
      return { message: "Token tidak valid" };
    }

    const { name } = body;

    if (!name?.trim()) {
      set.status = 400;
      return { message: "Nama tidak boleh kosong" };
    }

    try {
      const user = await getPrisma().user.update({
        where: { id: Number(userId) },
        data: { name: name.trim() },
      });

      return {
        message: "Nama berhasil diupdate",
        user: {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
          avatarUrl: user.avatar_url,
        },
      };
    } catch (err) {
      set.status = 500;
      return { message: err instanceof Error ? err.message : String(err) };
    }
  }, {
    body: t.Object({
      name: t.String(),
    }),
  })
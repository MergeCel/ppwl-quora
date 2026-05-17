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
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
      "openid",
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

  // ===============
  // Google OAuth
  // ===============
  .get("/google", ({ redirect }) => {
    const oauth2Client = createOAuthClient();
    const url = getAuthUrl(oauth2Client);
    return redirect(url);
  })

  .get("/callback", async ({ query, set, redirect }) => {
    const { code } = query as any;
    if (!code) {
      set.status = 400;
      return { message: "Missing code" };
    }

    try {
      const oauth2Client = createOAuthClient();
      const { tokens } = await oauth2Client.getToken(code);
      oauth2Client.setCredentials(tokens);

      const oauth2 = google.oauth2({ auth: oauth2Client, version: "v2" });
      const { data } = await oauth2.userinfo.get();

      const email = data.email as string;
      if (!email) {
        set.status = 400;
        return { message: "Google account has no email" };
      }

      // Cari atau buat user
      let user = await getPrisma().user.findUnique({ where: { email } });
      if (!user) {
        user = await getPrisma().user.create({
          data: {
            name: data.name || "",
            username: (data.email || data.id || "").replace(/[^a-z0-9]/gi, "_").toLowerCase(),
            email,
            avatar_url: data.picture || null,
            provider: "google",
            provider_id: data.id || null
          }
        });
      } else if (!user.provider_id) {
        // Update provider info if missing
        await getPrisma().user.update({ where: { id: user.id }, data: { provider: "google", provider_id: data.id } });
      }

      // Issue JWT (do not store tokens in DB here)
      const token = jwt.sign(
        {
          id: user.id.toString(),
          access_token: tokens.access_token,
          refresh_token: tokens.refresh_token,
        },
        process.env.JWT_SECRET!,
        { expiresIn: "7d" }
      );

      // Redirect back to frontend with token
      return redirect(`${process.env.FRONTEND_URL}/classroom?token=${token}`);
    } catch (err) {
      set.status = 500;
      return { message: err instanceof Error ? err.message : String(err) };
    }
  })
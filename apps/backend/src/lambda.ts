import Elysia, { t } from "elysia"
import { loadConfig } from "./config"
import { getPrisma } from "../prisma/dbPostgre"
import { authRoutes } from "./auth"

// Load config AWS SSM dulu
await loadConfig()

const app = new Elysia()

  // =============================
  // Daftarkan route auth
  // =============================
  .use(authRoutes)

  // =============================
  // GET /users?key=your-secret-key
  // =============================
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

    return users
  }, {
    query: t.Object({
      key: t.String()
    })
  })

  // =============================
  // GET /seed?key= (dummy data, hapus setelah testing)
  // =============================
  .get("/seed", async ({ query, set }) => {
    if (query.key !== process.env.SECRET_KEY) {
      set.status = 403
      return { message: "Forbidden" }
    }

    await getPrisma().post.createMany({
      data: [
        { user_id: 1n, content: "Apa pendapat kalian soal AI di 2026?" },
        { user_id: 1n, content: "Tips belajar pemrograman dari nol" }
      ]
    })

    return { message: "Dummy data berhasil dibuat" }
  })

export default app
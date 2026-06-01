import { Elysia } from "elysia";
import { jwt } from "@elysiajs/jwt";
import type { DbClient } from "./types";

const MAX_POSTS = 2;

export const postRoutes = (getPrisma: () => DbClient) =>
  new Elysia({ prefix: "/posts" })
    .use(jwt({ name: "jwt", secret: process.env.JWT_SECRET! }))

    .derive(async ({ headers, jwt, set }: any) => {
      const auth = headers.authorization;
      if (!auth) return { userId: null };
      const token = auth.replace("Bearer ", "");
      const payload = await jwt.verify(token);
      if (!payload) {
        set.status = 401;
        return { userId: null };
      }
      const userId = Number(payload.id);

      if (!userId || Number.isNaN(userId)) {
        set.status = 401;
        return { userId: null };
      }

      return { userId };
    })

    // GET /posts — feed publik
    .get("/", async () => {
      const posts = await (getPrisma() as any).post.findMany({
        orderBy: { created_at: "desc" },
        include: {
          user: {
            select: { id: true, name: true, username: true, avatar_url: true },
          },
          _count: { select: { likes: true, comments: true } },
        },
      });
      return { data: posts };
    })

    // GET /posts/my — post milik sendiri + sisa kuota
    .get("/my", async ({ userId, set }: any) => {
      if (!userId) {
        set.status = 401;
        return { error: "Unauthorized" };
      }
      const posts = await (getPrisma() as any).post.findMany({
        where: { user_id: userId },
        orderBy: { created_at: "desc" },
        include: { _count: { select: { likes: true, comments: true } } },
      });
      return {
        data: posts,
        remaining: Math.max(0, MAX_POSTS - posts.length),
        max: MAX_POSTS,
      };
    })

    // GET /posts/:id — detail post + komentar
    .get("/:id", async ({ params, set }: any) => {
      const post = await (getPrisma() as any).post.findUnique({
        where: { id: Number(params.id) },
        include: {
          user: {
            select: { id: true, name: true, username: true, avatar_url: true },
          },
          likes: { select: { user_id: true } },
          comments: {
            orderBy: { created_at: "asc" },
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  username: true,
                  avatar_url: true,
                },
              },
            },
          },
          _count: { select: { likes: true, comments: true } },
        },
      });
      if (!post) {
        set.status = 404;
        return { error: "Post tidak ditemukan" };
      }
      return { data: post };
    })

    // POST /posts — buat post baru
    .post("/", async ({ userId, set, body }: any) => {
      if (!userId) {
        set.status = 401;
        return { error: "Unauthorized" };
      }

      const count = await (getPrisma() as any).post.count({
        where: { user_id: userId },
      });
      if (count >= MAX_POSTS) {
        set.status = 403;
        return { error: `Maksimal ${MAX_POSTS} postingan per user` };
      }

      const { content, image_url } = body;
      if (!content?.trim()) {
        set.status = 400;
        return { error: "Konten tidak boleh kosong" };
      }

      const post = await (getPrisma() as any).post.create({
        data: {
          content: content.trim(),
          image_url: image_url || null,
          user_id: userId,
        },
        include: {
          user: {
            select: { id: true, name: true, username: true, avatar_url: true },
          },
          _count: { select: { likes: true, comments: true } },
        },
      });
      set.status = 201;
      return { data: post };
    })

    // PATCH /posts/:id — edit post
    .patch("/:id", async ({ userId, params, body, set }: any) => {
      if (!userId) {
        set.status = 401;
        return { error: "Unauthorized" };
      }

      const existing = await (getPrisma() as any).post.findUnique({
        where: { id: Number(params.id) },
      });
      if (!existing) {
        set.status = 404;
        return { error: "Post tidak ditemukan" };
      }
      if (existing.user_id !== userId) {
        set.status = 403;
        return { error: "Bukan postinganmu" };
      }

      const { content, image_url } = body;

      const updated = await (getPrisma() as any).post.update({
        where: { id: Number(params.id) },
        data: {
          ...(content ? { content: content.trim() } : {}),
          ...(image_url !== undefined ? { image_url: image_url || null } : {}),
        },
        include: {
          user: {
            select: { id: true, name: true, username: true, avatar_url: true },
          },
          _count: { select: { likes: true, comments: true } },
        },
      });
      return { data: updated };
    })

    // DELETE /posts/:id
    .delete("/:id", async ({ userId, params, set }: any) => {
      if (!userId) {
        set.status = 401;
        return { error: "Unauthorized" };
      }

      const existing = await (getPrisma() as any).post.findUnique({
        where: { id: Number(params.id) },
      });
      if (!existing) {
        set.status = 404;
        return { error: "Post tidak ditemukan" };
      }
      if (existing.user_id !== userId) {
        set.status = 403;
        return { error: "Bukan postinganmu" };
      }

      await (getPrisma() as any).post.delete({
        where: { id: Number(params.id) },
      });
      return { message: "Post berhasil dihapus" };
    })

    // POST /posts/:id/like — toggle like & notifikasi
    .post("/:id/like", async ({ userId, params, set }: any) => {
      if (!userId) {
        set.status = 401;
        return { error: "Unauthorized" };
      }

      const postId = Number(params.id);
      const post = await (getPrisma() as any).post.findUnique({
        where: { id: postId },
      });
      if (!post) {
        set.status = 404;
        return { error: "Post tidak ditemukan" };
      }

      const existing = await (getPrisma() as any).postLike.findUnique({
        where: { post_id_user_id: { post_id: postId, user_id: userId } },
      });

      if (existing) {
        await (getPrisma() as any).postLike.delete({
          where: { post_id_user_id: { post_id: postId, user_id: userId } },
        });
        const count = await (getPrisma() as any).postLike.count({
          where: { post_id: postId },
        });
        return { liked: false, like_count: count };
      } else {
        await (getPrisma() as any).postLike.create({
          data: { post_id: postId, user_id: userId },
        });

        // 🔔 NOTIFIKASI LIKE: Dikirim ke pemilik post (jika yang like bukan dirinya sendiri)
        if (post.user_id !== userId) {
          await (getPrisma() as any).notification.create({
            data: {
              user_id: post.user_id, // Penerima notif
              actor_id: userId, // Yang nge-like
              type: "like",
              post_id: postId,
            },
          });
        }

        const count = await (getPrisma() as any).postLike.count({
          where: { post_id: postId },
        });
        return { liked: true, like_count: count };
      }
    })

    // POST /posts/:id/comments — buat komentar baru & notifikasi
    .post("/:id/comments", async ({ userId, params, body, set }: any) => {
      if (!userId) {
        set.status = 401;
        return { error: "Unauthorized" };
      }

      const postId = Number(params.id);
      const { content } = body;

      if (!content?.trim()) {
        set.status = 400;
        return { error: "Komentar tidak boleh kosong" };
      }

      const post = await (getPrisma() as any).post.findUnique({
        where: { id: postId },
      });

      if (!post) {
        set.status = 404;
        return { error: "Post tidak ditemukan" };
      }

      const comment = await (getPrisma() as any).comment.create({
        data: {
          content: content.trim(),
          post_id: postId,
          user_id: userId,
        },
        include: {
          user: {
            select: { id: true, name: true, username: true, avatar_url: true },
          },
        },
      });

      // 🔔 NOTIFIKASI KOMENTAR: Dikirim ke pemilik post (jika yang komentar bukan dirinya sendiri)
      if (post.user_id !== userId) {
        await (getPrisma() as any).notification.create({
          data: {
            user_id: post.user_id, // Penerima notif
            actor_id: userId, // Yang berkomentar
            type: "comment",
            post_id: postId,
          },
        });
      }

      set.status = 201;
      return { data: comment };
    });

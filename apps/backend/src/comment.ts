import { Elysia } from "elysia";
import { jwt } from "@elysiajs/jwt";
import type { DbClient } from "./types";

const MAX_COMMENTS = 5;

export const commentRoutes = (getPrisma: () => DbClient) =>
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
      return { userId: payload.id as number };
    })

    // GET /posts/:id/comments
    .get("/:id/comments", async ({ params, set }: any) => {
      const postId = Number(params.id);

      try {
        const comments = await (getPrisma() as any).comment.findMany({
          where: { post_id: postId },
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
        });
        return { data: comments };
      } catch (error) {
        set.status = 500;
        return { error: "Gagal mengambil komentar" };
      }
    })

    // POST /posts/:id/comments
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

      try {
        const post = await (getPrisma() as any).post.findUnique({
          where: { id: postId },
        });

        if (!post) {
          set.status = 404;
          return { error: "Post tidak ditemukan" };
        }

        const userCommentCount = await (getPrisma() as any).comment.count({
          where: { post_id: postId, user_id: Number(userId) },
        });

        if (userCommentCount >= MAX_COMMENTS) {
          set.status = 403;
          return {
            error: `Maksimal ${MAX_COMMENTS} komentar per user per post`,
          };
        }

        const comment = await (getPrisma() as any).comment.create({
          data: {
            content: content.trim(),
            post_id: postId,
            user_id: Number(userId),
          },
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
        });

        if (post.user_id !== userId) {
          await (getPrisma() as any).notification.create({
            data: {
              user_id: post.user_id,
              actor_id: Number(userId),
              type: "comment",
              post_id: postId,
              comment_id: comment.id,
            },
          });
        }

        set.status = 201;
        return { data: comment };
      } catch (error) {
        console.error("--- DETAIL ERROR PRISMA ---", error);
        set.status = 500;
        return { error: "Database error" };
      }
    })

    // DELETE /posts/:id/comments/:commentId
    .delete(
      "/:id/comments/:commentId",
      async ({ userId, params, set }: any) => {
        if (!userId) {
          set.status = 401;
          return { error: "Unauthorized" };
        }

        const commentId = Number(params.commentId);
        try {
          const comment = await (getPrisma() as any).comment.findUnique({
            where: { id: commentId },
          });

          if (!comment) {
            set.status = 404;
            return { error: "Komentar tidak ditemukan" };
          }
          if (comment.user_id !== userId) {
            set.status = 403;
            return { error: "Bukan komentarmu" };
          }

          await (getPrisma() as any).comment.delete({
            where: { id: commentId },
          });
          return { message: "Komentar berhasil dihapus" };
        } catch (error) {
          set.status = 500;
          return { error: "Gagal menghapus komentar" };
        }
      },
    );

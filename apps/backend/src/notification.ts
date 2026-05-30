import { Elysia } from "elysia";
import { jwt } from "@elysiajs/jwt";
import type { DbClient } from "./types";

export const notificationRoutes = (getPrisma: () => DbClient) =>
  new Elysia({ prefix: "/notifications" })
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
      return { userId: payload.id as string }
    })

    // GET /notifications — ambil semua notifikasi milik user yang login
    .get("/", async ({ userId, set }: any) => {
      if (!userId) {
        set.status = 401;
        return { error: "Unauthorized" };
      }

      const notifications = await (getPrisma() as any).notification.findMany({
        where: { user_id: userId },
        orderBy: { created_at: "desc" },
        include: {
          actor: {
            select: { id: true, name: true, username: true, avatar_url: true },
          },
          post: {
            select: { id: true, content: true },
          },
        },
      });

      const unreadCount = notifications.filter((n: any) => !n.is_read).length;

      return { data: notifications, unread_count: unreadCount };
    })

    // PATCH /notifications/:id/read — tandai satu notif sudah dibaca
    .patch("/:id/read", async ({ userId, params, set }: any) => {
      if (!userId) {
        set.status = 401;
        return { error: "Unauthorized" };
      }

      const notifId = Number(params.id);

      const notif = await (getPrisma() as any).notification.findUnique({
        where: { id: notifId },
      });
      if (!notif) {
        set.status = 404;
        return { error: "Notifikasi tidak ditemukan" };
      }
      if (notif.user_id !== userId) {
        set.status = 403;
        return { error: "Bukan notifikasimu" };
      }

      const updated = await (getPrisma() as any).notification.update({
        where: { id: notifId },
        data: { is_read: true },
      });

      return { data: updated };
    })

    // PATCH /notifications/read-all — tandai semua notif sudah dibaca
    .patch("/read-all", async ({ userId, set }: any) => {
      if (!userId) {
        set.status = 401;
        return { error: "Unauthorized" };
      }

      await (getPrisma() as any).notification.updateMany({
        where: { user_id: userId, is_read: false },
        data: { is_read: true },
      });

      return { message: "Semua notifikasi ditandai sudah dibaca" };
    })

    // DELETE /notifications/:id — hapus satu notifikasi
    .delete("/:id", async ({ userId, params, set }: any) => {
      if (!userId) {
        set.status = 401;
        return { error: "Unauthorized" };
      }

      const notifId = Number(params.id);

      const notif = await (getPrisma() as any).notification.findUnique({
        where: { id: notifId },
      });
      if (!notif) {
        set.status = 404;
        return { error: "Notifikasi tidak ditemukan" };
      }
      if (notif.user_id !== userId) {
        set.status = 403;
        return { error: "Bukan notifikasimu" };
      }

      await (getPrisma() as any).notification.delete({
        where: { id: notifId },
      });

      return { message: "Notifikasi berhasil dihapus" };
    });
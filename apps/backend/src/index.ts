import { postRoutes } from "./post";
import { Elysia } from "elysia";
import { cookie } from "@elysiajs/cookie";
import { jwt } from "@elysiajs/jwt";
import { cors } from "@elysiajs/cors";
import { createOAuthClient, getAuthUrl } from "./auth";
import { getCourses, getCourseWorks, getSubmissions } from "./classroom";
import type { ApiResponse, HealthCheck, User } from "shared";
import type { DbClient } from "./types";
import bcrypt from "bcryptjs"  // ← TAMBAH INI

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

    .get(
      "/",
      (): ApiResponse<HealthCheck> => ({
        data: { status: "ok" },
        message: "server running",
      }),
    )

    .get("/debug", async () => {
      try {
        const userCount = await getPrisma().user.count();
        const sample = await getPrisma().user.findFirst();
        return {
          status: "ok",
          database: {
            type: "PostgreSQL AWS RDS",
            connected: true,
            userCount: userCount,
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

    .get("/users", async () => {
      const users = await getPrisma().user.findMany();
      const response: ApiResponse<User[]> = {
        data: users,
        message: "User list retrieved",
      };
      return response;
    })

    .get("/auth/login", ({ redirect }) => {
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
      return redirect(`${process.env.FRONTEND_URL}/classroom?token=${token}`);
    })

    .get("/auth/me", async ({ headers, jwt, set }) => {
      const auth = makeAuthMiddleware(jwt);
      const user = await auth({ headers, set });
      if (!user) return { loggedIn: false };
      return { loggedIn: true, user };
    })

    .get("/classroom/courses", async ({ headers, jwt, set }) => {
      const auth = makeAuthMiddleware(jwt);
      const user = await auth({ headers, set });
      if (!user) return;
      const courses = await getCourses(user.access_token);
      return { data: courses };
    })

    .get(
      "/classroom/courses/:courseId/submissions",
      async ({ params, headers, jwt, set }) => {
        const auth = makeAuthMiddleware(jwt);
        const user = await auth({ headers, set });
        if (!user) return;
        const { courseId } = params;
        const [courseWorks, submissions] = await Promise.all([
          getCourseWorks(user.access_token, courseId),
          getSubmissions(user.access_token, courseId),
        ]);
        return {
          data: courseWorks.map((cw) => ({
            courseWork: cw,
            submission:
              submissions.find((s) => s.courseWorkId === cw.id) ?? null,
          })),
        };
      },
    );

  return app;
};

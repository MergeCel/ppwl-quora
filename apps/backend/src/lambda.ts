import { createApp } from "./index"
import { getPrisma } from "../prisma/dbPostgre"

const app = createApp(getPrisma)

export const handler = async (event: any) => {
  try {
    console.log("LAMBDA START")

    const method =
      event.requestContext?.http?.method ||
      event.httpMethod ||
      "GET"

    const path =
      event.rawPath ||
      event.path ||
      "/"

    const queryString = event.rawQueryString
      ? `?${event.rawQueryString}`
      : ""

    const request = new Request(
      `https://${event.requestContext.domainName}${path}${queryString}`,
      {
        method,
        headers: event.headers,
        body:
          method !== "GET" && method !== "HEAD"
            ? event.body
            : undefined,
      }
    )

    const response = await app.handle(request)

    return {
      statusCode: response.status,
      headers: Object.fromEntries(response.headers.entries()),
      body: await response.text(),
    }
  } catch (err: any) {
    console.error("LAMBDA ERROR:", err)
    console.error(err?.stack)

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Internal Server Error",
        error: err?.message || String(err),
      }),
    }
  }
}
// Try to load dotenv if available (non-fatal if not installed)
(async () => {
	try {
		await import("dotenv/config");
	} catch (e) {
		// ignore: dotenv not installed or failed to load
	}
})();
import { createApp } from "./index"
import { getPrisma } from "../prisma/dbPostgre"

const app = createApp(getPrisma)

try {
	app.listen(3000)
	console.log("🦊 Backend    → http://localhost:3000")
	console.log("🦊 FRONTEND_URL →", process.env.FRONTEND_URL)
	console.log("🦊 DATABASE_URL →", process.env.DATABASE_URL)
	console.log("🦊 REDIRECT_URI →", process.env.GOOGLE_REDIRECT_URI)
} catch (err) {
	console.error("Failed to start server:", err)
	process.exit(1)
}
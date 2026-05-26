import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite"
import path from "path"

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  const check = env.VITE_CHECK;
  if (!check) throw new Error("env is not detected");
  console.log("Berhasil env:", check)

  return {
    base: '/', // 👈 INI KUNCI BIAR ASSETS-NYA DIBACA DARI ROOT DOMAIN
    build: {
      sourcemap: true
    },
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: { '@': path.resolve(__dirname, './src') }
    },
    server: {
      port: Number(env.VITE_PORT) || 5173,
      strictPort: true,
      proxy: {
        "/api": {
          target: env.VITE_BACKEND_URL || "http://localhost:3000",
          changeOrigin: true
        },
          "/auth": {
            target: env.VITE_BACKEND_URL || "http://localhost:3000",
            changeOrigin: true,
            secure: false
          },
      }
    }
  }
})
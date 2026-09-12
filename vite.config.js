import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    // `npm run dev:https` — Storyblok's visual editor requires the preview over HTTPS
    ...(mode === 'https' ? [basicSsl()] : []),
  ],
  // MapLibre starts its tile worker with `new Worker(url, { type: 'module' })`,
  // so the worker bundle has to be a real ES module. Vite's default for workers
  // is an IIFE, which a module worker cannot import from.
  worker: { format: 'es' },
  server: {
    // Respect an externally assigned port (e.g. preview harness); default 5173
    port: process.env.PORT ? Number(process.env.PORT) : 5173,
  },
}))

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './client/src'),
    },
  },
  server: {
    middlewareMode: false,
    allowedHosts: [
      '5173-ihysqhvwrqalz7t9u6s3x-685242dc.us2.manus.computer',
      'localhost',
      '127.0.0.1',
      '169.254.0.21'
    ],
    host: '0.0.0.0',
  },
  build: {
    outDir: 'dist/public',
    emptyOutDir: true,
  },
})

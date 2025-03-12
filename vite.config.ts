import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
  server: { port: 3000 },
  plugins: [react(),tsconfigPaths(),],
  resolve: {
    alias: {
      "@src": "/src",
      "@components": "/src/components",
      "@pages": "/src/pages",
      "@routers": "/src/routers"
    }
  },
  build: {
    sourcemap: true,
    outDir: 'build',
  },
})

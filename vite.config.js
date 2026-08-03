import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('gsap')) return 'gsap'
          if (id.includes('framer-motion')) return 'framer-motion'
          if (id.includes('swiper')) return 'swiper'
          if (id.includes('react-router-dom') || id.includes('/react-dom/') || id.includes('/react/')) return 'react-vendor'
        },
      },
    },
  },
})

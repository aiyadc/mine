import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { plugin as markdown } from 'vite-plugin-markdown'
import viteCompression from 'vite-plugin-compression'

export default defineConfig({
  plugins: [
    react(), 
    markdown({ mode: 'raw' }),
    viteCompression({
      algorithm: 'gzip',
      threshold: 10240,
      verbose: true,
    }),
    viteCompression({
      algorithm: 'brotliCompress',
      threshold: 10240,
      verbose: true,
      ext: '.br',
    }),
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom', 'lucide-react', 'react-markdown', 'remark-gfm'],
        },
      },
    },
    chunkSizeWarningLimit: 100,
  },
})

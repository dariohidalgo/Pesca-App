import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'leaflet-vendor': ['leaflet', 'react-leaflet'],
          'firebase-vendor': ['firebase/app', 'firebase/firestore'],
          'lucide-vendor': ['lucide-react']
        }
      }
    }
  }
})

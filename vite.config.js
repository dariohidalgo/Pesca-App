import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [
    tailwindcss(),
    react()
  ],
  build: {
    rollupOptions: {
      output: {
        ...(isSsrBuild ? {} : {
          manualChunks: {
            'leaflet-vendor': ['leaflet', 'react-leaflet'],
            'firebase-vendor': ['firebase/app', 'firebase/firestore'],
            'lucide-vendor': ['lucide-react']
          }
        })
      }
    }
  }
}))


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Rutas relativas: el build funciona en la raíz (Vercel) o en un
  // subdirectorio (GitHub Pages: /terrall/) sin cambiar la configuración.
  base: './',
  build: {
    // three.js minificado pesa ~730 kB y no se puede dividir más
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        // Three.js y React Three Fiber en chunks propios: el código de la app
        // cambia más seguido y no obliga a descargar de nuevo las librerías 3D.
        manualChunks: {
          three: ['three'],
          r3f: ['@react-three/fiber', '@react-three/drei'],
        },
      },
    },
  },
})

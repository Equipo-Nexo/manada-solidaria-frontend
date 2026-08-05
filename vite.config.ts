import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { readFileSync } from 'fs'
import { fileURLToPath, URL } from "node:url";

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'))

export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@components": fileURLToPath(new URL("./src/common/components", import.meta.url)),
      "@hooks": fileURLToPath(new URL("./src/common/hooks", import.meta.url)),
      "@services": fileURLToPath(new URL("./src/common/app/services", import.meta.url)),
      "@utils": fileURLToPath(new URL("./src/common/utils", import.meta.url)),
      "@models": fileURLToPath(new URL("./src/common/app/types", import.meta.url)),
      "@icons": fileURLToPath(new URL("./src/common/icons", import.meta.url)),
      "@styles": fileURLToPath(new URL("./src/common/styles", import.meta.url)),
      "@images": fileURLToPath(new URL("./src/common/assets/images", import.meta.url)),
      "@store": fileURLToPath(new URL("./src/common/app/store", import.meta.url)),
      "@app": fileURLToPath(new URL("./src/common/app", import.meta.url)),
      "@animals": fileURLToPath(new URL("./src/animals", import.meta.url)),
    },
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: 'Manada Solidaria',
        short_name: 'ManadaSolidaria',
        description: 'AplicaciÃ³n Manada Solidaria',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/pwa-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/pwa-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
})

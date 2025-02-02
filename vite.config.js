import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import lqip from 'vite-plugin-lqip' // TODO not working without config
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import { robots } from 'vite-plugin-robots'
import Sitemap from 'vite-plugin-sitemap'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA(),
    lqip(),
    ViteImageOptimizer()
    // robots()
    //  Sitemap({ hostname: 'TODO' })
  ]
})

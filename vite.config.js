import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon-192.svg', 'icon-512.svg'],
      manifest: {
        name: 'CyberPath Academy',
        short_name: 'CyberPath',
        description: 'خارطة طريق متكاملة لتعلم الأمن السيبراني من الصفر للاحتراف',
        theme_color: '#04080f',
        background_color: '#04080f',
        display: 'standalone',
        orientation: 'any',
        lang: 'ar',
        dir: 'rtl',
        start_url: '/cybersec-roadmap/',
        icons: [
          { src: 'icon-192.svg', sizes: '192x192', type: 'image/svg+xml', purpose: 'any' },
          { src: 'icon-512.svg', sizes: '512x512', type: 'image/svg+xml', purpose: 'any maskable' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg}'],
        runtimeCaching: [{
          urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
          handler: 'CacheFirst',
          options: { cacheName: 'google-fonts', expiration: { maxEntries: 10, maxAgeSeconds: 86400 } }
        }]
      }
    })
  ],
  base: '/cybersec-roadmap/',
  server: {
    port: 5000,
    host: '0.0.0.0',
    allowedHosts: true
  }
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

function devServiceWorkerCleanup() {
  const cleanupWorker = `
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    await self.registration.unregister();
    const keys = await caches.keys();
    await Promise.all(keys.map((key) => caches.delete(key)));
    const clients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    clients.forEach((client) => client.navigate(client.url));
  })());
});
`;
  const cleanupRegister = `
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations()
    .then((registrations) => Promise.all(registrations.map((registration) => registration.unregister())))
    .then(() => 'caches' in window ? caches.keys().then((keys) => Promise.all(keys.map((key) => caches.delete(key)))) : null)
    .catch(() => {});
}
`;
  const workerPaths = new Set(['/sw.js', '/dev-sw.js', '/cybersec-roadmap/sw.js', '/cybersec-roadmap/dev-sw.js']);
  const registerPaths = new Set(['/registerSW.js', '/cybersec-roadmap/registerSW.js']);

  return {
    name: 'cyberpath-dev-service-worker-cleanup',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const path = (req.url || '').split('?')[0];
        if (workerPaths.has(path)) {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
          res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
          res.end(cleanupWorker);
          return;
        }
        if (registerPaths.has(path)) {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
          res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
          res.end(cleanupRegister);
          return;
        }
        next();
      });
    }
  };
}

export default defineConfig({
  plugins: [
    devServiceWorkerCleanup(),
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

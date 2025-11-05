import { defineConfig } from 'vite';
import { resolve } from 'path';
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        // Auth pages
        login: resolve(__dirname, 'src/pages/auth/login.html'),
        register: resolve(__dirname, 'src/pages/auth/register.html'),
        forgot: resolve(__dirname, 'src/pages/auth/forgot-password.html'),
        lock: resolve(__dirname, 'src/pages/auth/lock-screen.html'),
        // Dashboard pages
        analytics: resolve(__dirname, 'src/pages/dashboard/analytics.html'),
        ecommerce: resolve(__dirname, 'src/pages/dashboard/ecommerce.html'),
        crm: resolve(__dirname, 'src/pages/dashboard/crm.html'),
        // User pages
        users: resolve(__dirname, 'src/pages/user/users-list.html'),
        profile: resolve(__dirname, 'src/pages/user/profile.html'),
        settings: resolve(__dirname, 'src/pages/user/settings.html'),
      },
      output: {
        manualChunks: {
          jquery: ['jquery'],
          charts: ['apexcharts', 'chart.js'],
          datatables: ['datatables.net', 'datatables.net-dt'],
          calendar: ['fullcalendar'],
        },
      },
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
    chunkSizeWarningLimit: 500,
  },
  plugins: [
    createHtmlPlugin({
      minify: true,
    }),
  ],
  server: {
    port: 3000,
    open: true,
    cors: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@assets': resolve(__dirname, 'src/assets'),
      '@components': resolve(__dirname, 'src/components'),
      '@pages': resolve(__dirname, 'src/pages'),
    },
  },
});

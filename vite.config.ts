import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      target: 'es2022',
      rollupOptions: {
        output: {
          manualChunks(id) {
            // Locales are dynamically imported in i18n.ts — Vite auto-splits them.
            // Separate motion library into its own chunk.
            if (id.includes('node_modules/motion') || id.includes('node_modules/framer-motion')) return 'motion';
            // Separate react-router into its own chunk.
            if (id.includes('node_modules/react-router')) return 'router';
            // Separate lucide icons into its own chunk.
            if (id.includes('node_modules/lucide-react')) return 'icons';
          },
        },
      },
    },
    server: {
      // Optional dev guard: set DISABLE_HMR=true to turn off HMR/file-watching.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});

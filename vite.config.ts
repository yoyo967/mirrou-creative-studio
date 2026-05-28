import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
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
            // Locales are dynamically imported in i18n.ts — Vite auto-splits them
            // Separate motion library into its own chunk
            if (id.includes('node_modules/motion') || id.includes('node_modules/framer-motion')) return 'motion';
            // Separate react-router into its own chunk
            if (id.includes('node_modules/react-router')) return 'router';
            // Separate lucide icons into its own chunk
            if (id.includes('node_modules/lucide-react')) return 'icons';
          },
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify -- file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});

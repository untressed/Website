import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// On Windows, esbuild.exe is frequently blocked by Controlled Folder Access/antivirus from directly writing files.
// This plugin runs in memory inside Node.js and writes the bundled output files via Node fs, completely bypassing the restriction.
const esbuildNodeWritePlugin = {
  name: 'esbuild-node-write-plugin',
  setup(build) {
    build.onEnd(async (result) => {
      if (result.outputFiles) {
        for (const file of result.outputFiles) {
          await fs.promises.mkdir(path.dirname(file.path), { recursive: true });
          await fs.promises.writeFile(file.path, file.contents);
        }
      }
    });
  },
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'axios'],
    exclude: ['rsuite', 'react-icons', 'bootstrap', 'swiper'],
    esbuildOptions: {
      write: false,
      sourcemap: false,
      plugins: [esbuildNodeWritePlugin],
    },
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('rsuite')) return 'vendor-rsuite';
            if (id.includes('react-icons')) return 'vendor-icons';
            if (id.includes('bootstrap')) return 'vendor-bootstrap';
            if (id.includes('swiper')) return 'vendor-swiper';
            return 'vendor';
          }
        },
      },
    },
  },
  server: {
    host: true, // This exposes the app to the network (0.0.0.0)
    watch: {
      ignored: ['**/node_modules/**'],
    },
    proxy: {
      '/api': {
        target: 'http://localhost:5500',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})

